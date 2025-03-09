// Handles /users API endpoints

const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// Register a new user
router.post('/', (req, res) => {
  const newUser = req.body;
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read users data' });
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to register user' });
      res.status(201).json(newUser);
    });
  });
});


// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Retrieve user details
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read users data' });
    const users = JSON.parse(data);
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
});

module.exports = router;