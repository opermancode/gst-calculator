import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Calculator from './Calculator';

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>GST Calculator App</h1>
      <Signup />
      <Login />
      <Calculator />
    </div>
  );
}

export default App;
