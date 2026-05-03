import React, { useState } from 'react';
import { login } from './api';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
      setToken(res.data.token);
      alert("Login successful!");
    } catch {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <input style={inputStyle} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button style={buttonStyle} onClick={handleLogin}>Login</button>
    </div>
  );
}
