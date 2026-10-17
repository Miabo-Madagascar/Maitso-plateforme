// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Origines autorisées, séparées par des virgules (ex. https://maitso.mg)
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// Refuse les opérateurs de requête ($ne, $gt...) venant des clients
mongoose.set('sanitizeFilter', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/startups').then(() => console.log('MongoDB connecté'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

app.use('/api/startups', require('./routes/startups'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
