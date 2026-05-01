import React, { useState } from 'react';
import { calculateGST } from '../api';

export default function Calculator({ token }) {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [result, setResult] = useState(null);

  const containerStyle = {
    margin: '20px 0',
    padding: '20px',
    borderRadius: '12px',
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid #ddd'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: '#0078d7',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const resultStyle = {
    marginTop: '20px',
    padding: '15px',
    background: '#e9f5ff',
    borderRadius: '8px',
    textAlign: 'center'
  };

  const handleCalculate = async () => {
    try {
      const res = await calculateGST({ amount: Number(amount), gstRate: Number(gstRate) }, token);
      setResult(res.data);
    } catch {
      alert("Calculation failed. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>GST Calculator</h2>
      <input style={inputStyle} placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <input style={inputStyle} placeholder="GST Rate (%)" value={gstRate} onChange={e => setGstRate(e.target.value)} />
      <button style={buttonStyle} onClick={handleCalculate}>Calculate</button>
      {result && (
        <div style={resultStyle}>
          <p><strong>GST:</strong> {result.gst}</p>
          <p><strong>Total:</strong> {result.total}</p>
        </div>
      )}
    </div>
  );
}
