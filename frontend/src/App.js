import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Calculator from './components/Calculator';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      <h1>GST Calculator App</h1>
      {!token ? (
        <>
          <Signup />
          <Login setToken={setToken} />
        </>
      ) : (
        <Calculator token={token} />
      )}
    </div>
  );
}

export default App;
