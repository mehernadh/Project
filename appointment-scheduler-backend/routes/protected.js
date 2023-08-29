// backend/routes/protected.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

router.get('/protected-route', verifyToken, (req, res) => {
  // This route is protected and can only be accessed with a valid token
  res.json({ message: 'Protected route accessed' });
});

module.exports = router;
