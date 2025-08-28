// models/Startup.js
const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sector: { type: String, required: true },
  description: String,
  website: String,
  country: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Startup', startupSchema);
