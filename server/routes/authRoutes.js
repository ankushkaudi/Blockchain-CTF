// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const contract = require('../blockchain/contract');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const result = await contract.registerUser(username, password);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await contract.loginUser(username, password);
  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(401).json({ error: result.error });
  }
});

module.exports = router;
