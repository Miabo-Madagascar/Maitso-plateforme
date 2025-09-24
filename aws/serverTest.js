const express = require('express');
const { getAllItems, putItem } = require('./dynamoClient');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get('/sensors', async (req, res) => {
  const items = await getAllItems();
  res.json(items);
});

app.post('/sensors', async (req, res) => {
  const success = await putItem(req.body);
  res.json({ success });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

