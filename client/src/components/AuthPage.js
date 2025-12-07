import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthPage = ({ setToken }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? <Login setToken={setToken} /> : <Register />}
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Need to register?' : 'Have an account?'}
      </button>
    </div>
  );
};

export default AuthPage;
