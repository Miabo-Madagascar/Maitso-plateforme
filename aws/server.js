// const express = require('express');
// const { getAllItems, putItem } = require('./dynamoClient');

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 8080;

// app.get('/sensors', async (req, res) => {
//   const items = await getAllItems();
//   res.json(items);
// });

// app.post('/sensors', async (req, res) => {
//   const success = await putItem(req.body);
//   res.json({ success });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const axios = require('axios');
const express = require('express');
const { getAllItems, putItem } = require('./dynamoClient');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Helpers
function filterByDevice(data, device_id) {
  return data.filter(item => item.device_id === device_id);
}

function filterByTime(data, from, to) {
  return data.filter(item => {
    if (from && item.timestamp < from) return false;
    if (to && item.timestamp > to) return false;
    return true;
  });
}

// Conversion timestamp → début de période
function getPeriodStart(ts, groupBy) {
  const date = new Date(ts * 1000);
  switch (groupBy) {
    case 'hour':
      date.setMinutes(0, 0, 0);
      break;
    case 'day':
      date.setHours(0, 0, 0, 0);
      break;
    case 'week': {
      const day = date.getUTCDay(); // 0 = dimanche
      date.setUTCDate(date.getUTCDate() - day);
      date.setUTCHours(0, 0, 0, 0);
      break;
    }
    case 'month':
      date.setUTCDate(1);
      date.setUTCHours(0, 0, 0, 0);
      break;
    default:
      return ts;
  }
  return Math.floor(date.getTime() / 1000);
}

// Group data by period
function groupData(data, groupBy) {
  const grouped = {};
  data.forEach(item => {
    const period = getPeriodStart(item.timestamp, groupBy);
    if (!grouped[period]) grouped[period] = [];
    grouped[period].push(item);
  });
  return grouped;
}

// Calculate averages
function calculateAverages(data, metrics) {
  const result = {};
  metrics.forEach(metric => {
    const values = data.map(d => d.payload[metric]).filter(v => v !== undefined);
    if (values.length > 0) {
      const sum = values.reduce((a, b) => a + b, 0);
      result[metric] = sum / values.length;
    }
  });
  return result;
}

// Calculate stats (avg, min, max)
function calculateStats(data, metrics) {
  const values = {};
  metrics.forEach(metric => {
    const metricValues = data.map(d => d.payload[metric]).filter(v => v !== undefined);
    if (metricValues.length > 0) {
      const sum = metricValues.reduce((a, b) => a + b, 0);
      values[metric] = {
        avg: sum / metricValues.length,
        min: Math.min(...metricValues),
        max: Math.max(...metricValues)
      };
    }
  });
  return values;
}

// Route pour toutes les données avec group_by
app.get('/sensors/data', async (req, res) => {
  let items = await getAllItems();
  const { from, to, metrics, group_by } = req.query;

  if (from || to) items = filterByTime(items, from ? parseInt(from) : null, to ? parseInt(to) : null);

  if (metrics) {
    const metricList = metrics.split(',');
    items = items.map(item => ({
      ...item,
      payload: Object.fromEntries(metricList.map(m => [m, item.payload[m]]))
    }));
  }

  if (group_by) {
    const grouped = groupData(items, group_by);
    const groupedArray = Object.entries(grouped).map(([periodStart, groupItems]) => ({
      period_start: parseInt(periodStart),
      period_end: Math.max(...groupItems.map(d => d.timestamp)),
      data: groupItems
    }));
    res.json(groupedArray);
  } else {
    res.json(items);
  }
});

// Route pour un device spécifique avec group_by
app.get('/sensors/data/:device_id', async (req, res) => {
  let items = await getAllItems();
  items = filterByDevice(items, req.params.device_id);

  const { from, to, metrics, group_by } = req.query;
  if (from || to) items = filterByTime(items, from ? parseInt(from) : null, to ? parseInt(to) : null);

  if (metrics) {
    const metricList = metrics.split(',');
    items = items.map(item => ({
      ...item,
      payload: Object.fromEntries(metricList.map(m => [m, item.payload[m]]))
    }));
  }

  if (group_by) {
    const grouped = groupData(items, group_by);
    const groupedArray = Object.entries(grouped).map(([periodStart, groupItems]) => ({
      period_start: parseInt(periodStart),
      period_end: Math.max(...groupItems.map(d => d.timestamp)),
      data: groupItems
    }));
    res.json(groupedArray);
  } else {
    res.json(items);
  }
});


// Moyenne avec group_by
app.get('/sensors/data/:device_id/avg', async (req, res) => {
  let items = await getAllItems();
  items = filterByDevice(items, req.params.device_id);

  const { from, to, metrics, group_by } = req.query;
  if (from || to) items = filterByTime(items, from ? parseInt(from) : null, to ? parseInt(to) : null);

  const metricList = metrics ? metrics.split(',') : Object.keys(items[0]?.payload || {});

  if (group_by) {
    const grouped = groupData(items, group_by);
    const averages = Object.entries(grouped).map(([periodStart, groupItems]) => ({
      period_start: parseInt(periodStart),
      period_end: Math.max(...groupItems.map(d => d.timestamp)),
      averages: calculateAverages(groupItems, metricList)
    }));
    res.json({
      device_id: req.params.device_id,
      from: from ? parseInt(from) : null,
      to: to ? parseInt(to) : null,
      group_by,
      metrics: metricList,
      averages
    });
  } else {
    res.json({
      device_id: req.params.device_id,
      from: from ? parseInt(from) : null,
      to: to ? parseInt(to) : null,
      metrics: metricList,
      averages: calculateAverages(items, metricList)
    });
  }
});

// Stats avec group_by
app.get('/sensors/data/:device_id/stats', async (req, res) => {
  let items = await getAllItems();
  items = filterByDevice(items, req.params.device_id);

  const { from, to, metrics, group_by } = req.query;
  if (from || to) items = filterByTime(items, from ? parseInt(from) : null, to ? parseInt(to) : null);

  const metricList = metrics ? metrics.split(',') : Object.keys(items[0]?.payload || {});

  let stats = [];
  if (group_by) {
    const grouped = groupData(items, group_by);
    stats = Object.entries(grouped).map(([periodStart, groupItems]) => ({
      period_start: parseInt(periodStart),
      period_end: Math.max(...groupItems.map(d => d.timestamp)),
      values: calculateStats(groupItems, metricList)
    }));
  } else {
    stats = items.map(item => ({
      period_start: item.timestamp,
      period_end: item.timestamp,
      values: calculateStats([item], metricList)
    }));
  }

  res.json({
    device_id: req.params.device_id,
    from: from ? parseInt(from) : null,
    to: to ? parseInt(to) : null,
    group_by: group_by || null,
    metrics: metricList,
    stats
  });
});

// Predictions
app.post('/sensors/:device_id/predict', async (req, res) => {
  const { model_type } = req.body;
  if (!['lstm', 'cnn'].includes(model_type)) {
    return res.status(400).json({ error: 'model_type inconnu' });
  }

  // Récupérer les données du device
  let items = await getAllItems();
  items = filterByDevice(items, req.params.device_id);

  if (items.length < 14) {
    return res.status(400).json({ error: 'pas assez de données' });
  }

  // Construire la séquence des 14 derniers jours
  // On prend les 14 derniers items triés par timestamp croissant
  const sortedItems = items.sort((a, b) => a.timestamp - b.timestamp);
  const last14 = sortedItems.slice(-14);

  // On suppose que chaque payload a exactement les 10 variables attendues
  const sequence = last14.map(item => [
    item.payload.TMP,
    item.payload.HUM,
    item.payload.PCO,
    item.payload.BR,
    item.payload.DEC_PAP,
    item.payload.PA,
    item.payload.VIB,
    item.payload.DEC_ORG,
    item.payload.DEC_MGP,
    item.payload.TCO
  ]);

  try {
    const response = await axios.post('http://localhost:8000/predict', {
      sequence,
      model_type
    });

    // On renvoie directement la réponse de l'API externe
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erreur lors de la prédiction' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
