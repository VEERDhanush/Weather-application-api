import React, { useState } from 'react';

const UserLogin = ({ onLogin, onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin({ username, password });
  };

  return (
    <div className="user-login">
      <h2>User Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={onAdminLogin}>Admin Login</button>
    </div>
  );
};

export default UserLogin;
