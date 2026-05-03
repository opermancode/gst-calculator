import React, { useState } from 'react';
import { calculateGST } from './api';

export default function Calculator({ token }) {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!amount) {
      alert("Please enter amount");
      return;
    }

    try {
      setLoading(true);

      const res = await calculateGST(
        { amount: Number(amount), gstRate: Number(gstRate) },
        token
      );

      setResult(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🇮🇳 GST Calculator</h2>

      {/* Input Section */}
      <div style={styles.card}>
        <label>Amount (₹)</label>
        <input
          style={styles.input}
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>GST Rate (%)</label>
        <select
          style={styles.input}
          value={gstRate}
          onChange={(e) => setGstRate(e.target.value)}
        >
          <option value="5">5%</option>
          <option value="12">12%</option>
          <option value="18">18%</option>
          <option value="28">28%</option>
        </select>

        <button
          style={{
            ...styles.button,
            background: loading ? '#aaa' : '#0078d7'
          }}
          onClick={handleCalculate}
          disabled={loading}
        >
          {loading ? "Calculating..." : "Calculate GST"}
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div style={styles.resultCard}>
          <h3>📊 GST Breakdown</h3>

          <div style={styles.resultRow}>
            <span>Original Amount</span>
            <span>₹ {result.originalAmount}</span>
          </div>

          <div style={styles.resultRow}>
            <span>GST Rate</span>
            <span>{result.gstRate}%</span>
          </div>

          <div style={styles.resultRow}>
            <span>GST Amount</span>
            <span>₹ {result.gstAmount}</span>
          </div>

          {/* CGST + SGST Split */}
          <div style={styles.splitBox}>
            <div>
              <p>CGST (Half)</p>
              <strong>₹ {(result.gstAmount / 2).toFixed(2)}</strong>
            </div>
            <div>
              <p>SGST (Half)</p>
              <strong>₹ {(result.gstAmount / 2).toFixed(2)}</strong>
            </div>
          </div>

          <div style={styles.totalBox}>
            <span>Total Amount</span>
            <strong>₹ {result.totalAmount}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  title: {
    textAlign: 'center',
    margin: 0,
    color: '#2c3e50'
  },

  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },

  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd'
  },

  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
  },

  resultCard: {
    background: '#f8faff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
  },

  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '8px 0'
  },

  splitBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    padding: '10px',
    background: '#eef4ff',
    borderRadius: '8px'
  },

  totalBox: {
    marginTop: '15px',
    padding: '15px',
    background: '#0078d7',
    color: '#fff',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px'
  }
};
