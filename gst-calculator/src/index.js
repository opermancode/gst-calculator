import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Middleware
app.use(cors());
app.use(express.json());


// ==========================
// 🩺 Health Check (K8s ready)
// ==========================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});


// ==========================
// 🔐 JWT Middleware
// ==========================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};


// ==========================
// 🧮 GST Calculation API
// ==========================
app.post('/calculate', authenticateToken, (req, res) => {
  try {
    const { amount, gstRate } = req.body;

    // ✅ Validation
    if (!amount || !gstRate) {
      return res.status(400).json({
        message: 'Amount and GST rate are required'
      });
    }

    if (amount <= 0 || gstRate <= 0) {
      return res.status(400).json({
        message: 'Amount and GST rate must be greater than zero'
      });
    }

    // ✅ GST Calculation
    const gstAmount = (amount * gstRate) / 100;
    const totalAmount = amount + gstAmount;

    // ✅ Indian GST Split
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    res.json({
      originalAmount: parseFloat(amount),
      gstRate: parseFloat(gstRate),
      gstAmount: parseFloat(gstAmount.toFixed(2)),
      cgst: parseFloat(cgst.toFixed(2)),
      sgst: parseFloat(sgst.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2))
    });

  } catch (err) {
    console.error("❌ GST Calculation Error:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// ==========================
// 🚀 Start Server
// ==========================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 GST Calculator Service running on port ${PORT}`);
});
