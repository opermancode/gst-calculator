import React, { useState } from 'react';
import { login } from './api';

export default function Login({ setToken, setCurrentPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await login({ username, password });

      setToken(res.data.token);

      // ✅ Navigate to calculator
      setCurrentPage('calculator');

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome Back 👋</h2>
      <p style={styles.subtitle}>Login to continue</p>

      <input
        style={styles.input}
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        style={{
          ...styles.button,
          background: loading ? '#aaa' : '#0078d7'
        }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={styles.footerText}>
        Don't have an account?{" "}
        <span
          style={styles.link}
          onClick={() => setCurrentPage('signup')}
        >
          Signup
        </span>
      </p>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  title: {
    margin: 0,
    textAlign: 'center',
    fontSize: '24px',
    color: '#2c3e50'
  },

  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: '10px'
  },

  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px'
  },

  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.2s'
  },

  footerText: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '14px'
  },

  link: {
    color: '#0078d7',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};
