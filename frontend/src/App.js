import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import Login from './Login';
import Calculator from './Calculator';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentPage, setCurrentPage] = useState('landing'); // landing, signup, login

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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>GST Calculator App</h1>

      {currentPage === 'landing' && !token && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Welcome to GST Calculator</h2>
          <p style={{ margin: '20px 0' }}>Simple and secure way to calculate GST</p>
          
          <button 
            onClick={() => setCurrentPage('signup')}
            style={{ padding: '12px 30px', margin: '10px', fontSize: '16px', background: '#0078d7', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Signup
          </button>
          
          <button 
            onClick={() => setCurrentPage('login')}
            style={{ padding: '12px 30px', margin: '10px', fontSize: '16px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Login
          </button>
        </div>
      )}

      {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
      {currentPage === 'login' && <Login setToken={handleLoginSuccess} setCurrentPage={setCurrentPage} />}
      
      {token && currentPage === 'calculator' && (
        <>
          <div style={{ textAlign: 'right', marginBottom: '15px' }}>
            <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px' }}>
              Logout
            </button>
          </div>
          <Calculator token={token} />
        </>
      )}
    </div>
  );
}

export default App;
