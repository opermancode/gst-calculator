const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const app = express();
app.use(express.json());

// signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashed]);
  res.json({ message: 'User created successfully' });
});

// login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  if (result.rows.length === 0) return res.status(400).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, result.rows[0].password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

app.listen(8081, () => console.log('User Service running on port 8081'));
