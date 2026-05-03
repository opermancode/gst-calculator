import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();   // This will load .env from the root folder

const app = express();
const PORT = 8081;   // ← Hardcoded as requested

app.use(express.json());

// Signup Endpoint
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)', 
      [username, hashed]
    );
    
    res.json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1', 
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, result.rows[0].password);
    
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username }, 
      process.env.JWT_SECRET || 'secretkey', 
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ User Service running on http://localhost:${PORT}`);
});
