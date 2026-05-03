import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// ✅ CORS Configuration
app.use(cors({
  origin: "*", // 🔥 For now (later restrict to frontend URL)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Middleware
app.use(express.json());

// ✅ Health Check (very useful for K8s later)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});


// ==========================
// 🔐 Signup Endpoint
// ==========================
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Insert user
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hashed]
    );

    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {

    // ✅ Duplicate user handling (Postgres error code)
    if (err.code === '23505') {
      return res.status(400).json({ message: 'User already exists' });
    }

    console.error("❌ Signup Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


// ==========================
// 🔐 Login Endpoint
// ==========================
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ✅ JWT Token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});


// ==========================
// 🚀 Start Server
// ==========================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
