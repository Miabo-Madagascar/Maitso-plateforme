// middleware/requireApiKey.js
const crypto = require('crypto');

// Vérifie que l'en-tête X-API-Key correspond à STARTUP_API_KEY
module.exports = (req, res, next) => {
  const expected = process.env.STARTUP_API_KEY;
  const provided = req.get('X-API-Key') || '';

  // Sans clé configurée, toutes les écritures sont refusées
  if (!expected) {
    return res.status(503).json({ message: 'STARTUP_API_KEY non configurée' });
  }

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ message: 'Clé API invalide' });
  }

  next();
};
