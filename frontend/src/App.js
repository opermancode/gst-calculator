import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';
import Calculator from './Calculator';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    if (token) {
      setCurrentPage('calculator');
    }
  }, [token]);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCurrentPage('landing');
  };

  return (
    <div style={styles.page}>
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>GST Calculator</h1>
        {token && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>

      {/* Main Card */}
      <div style={styles.card}>

        {/* Landing */}
        {currentPage === 'landing' && !token && (
          <div style={styles.center}>
            <h2>Welcome 👋</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Calculate GST instantly with secure login
            </p>

            <button
              style={{ ...styles.btn, background: '#0078d7' }}
              onClick={() => setCurrentPage('signup')}
            >
              Create Account
            </button>

            <button
              style={{ ...styles.btn, background: '#27ae60' }}
              onClick={() => setCurrentPage('login')}
            >
              Login
            </button>
          </div>
        )}

        {/* Signup */}
        {currentPage === 'signup' && (
          <Signup setCurrentPage={setCurrentPage} />
        )}

        {/* Login */}
        {currentPage === 'login' && (
          <Login
            setToken={handleLoginSuccess}
            setCurrentPage={setCurrentPage}
          />
        )}

        {/* Calculator */}
        {token && currentPage === 'calculator' && (
          <Calculator token={token} />
        )}

      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px',
    fontFamily: 'Segoe UI, sans-serif'
  },

  header: {
    width: '90%',
    maxWidth: '900px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    color: '#fff'
  },

  title: {
    margin: 0,
    fontSize: '28px'
  },

  logoutBtn: {
    padding: '8px 16px',
    background: '#e74c3c',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer'
  },

  card: {
    width: '100%',
    maxWidth: '450px',
    background: '#fff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.3s ease-in-out'
  },

  center: {
    textAlign: 'center'
  },

  btn: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default App;
