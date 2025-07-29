// routes/startups.js
const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');

// Créer une startup
router.post('/', async (req, res) => {
  try {
    const startup = new Startup(req.body);
    await startup.save();
    res.status(201).json(startup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lire toutes les startups
router.get('/', async (req, res) => {
  try {
    const startups = await Startup.find();
    res.json(startups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lire une startup par ID
router.get('/:id', async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id);
    if (!startup) return res.status(404).json({ message: 'Not found' });
    res.json(startup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mettre à jour une startup
router.put('/:id', async (req, res) => {
  try {
    const updatedStartup = await Startup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStartup) return res.status(404).json({ message: 'Not found' });
    res.json(updatedStartup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Supprimer une startup
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Startup.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Startup supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
