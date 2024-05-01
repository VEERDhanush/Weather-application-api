import React, { useState } from 'react';

const AdminLogin = ({ onLogin }) => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleLogin = () => {
    onLogin({ adminUsername, adminPassword });
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={adminUsername}
        onChange={(e) => setAdminUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;