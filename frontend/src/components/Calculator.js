import React, { useState } from 'react';
import { calculateGST } from '../api';

export default function Calculator({ token }) {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    const res = await calculateGST({ amount: Number(amount), gstRate: Number(gstRate) }, token);
    setResult(res.data);
  };

  return (
    <div>
      <h2>GST Calculator</h2>
      <input placeholder="Amount" onChange={e => setAmount(e.target.value)} />
      <input placeholder="GST Rate (%)" onChange={e => setGstRate(e.target.value)} />
      <button onClick={handleCalculate}>Calculate</button>
      {result && (
        <div>
          <p>GST: {result.gst}</p>
          <p>Total: {result.total}</p>
        </div>
      )}
    </div>
  );
}
