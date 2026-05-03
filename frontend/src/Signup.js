import React, { useState } from 'react';
import { signup } from './api';

export default function Signup({ setCurrentPage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await signup({ username, password });

      alert("Signup successful! Please login.");

      // ✅ Go to login page
      setCurrentPage('login');

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Account 🚀</h2>
      <p style={styles.subtitle}>Join to start using GST Calculator</p>

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

      <input
        style={styles.input}
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />

      {/* Password match hint */}
      {confirmPassword && password !== confirmPassword && (
        <p style={styles.error}>Passwords do not match</p>
      )}

      <button
        style={{
          ...styles.button,
          background: loading ? '#aaa' : '#27ae60'
        }}
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Creating account..." : "Signup"}
      </button>

      <p style={styles.footerText}>
        Already have an account?{" "}
        <span
          style={styles.link}
          onClick={() => setCurrentPage('login')}
        >
          Login
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
  },

  error: {
    color: '#e74c3c',
    fontSize: '13px',
    marginTop: '-5px'
  }
};
