import React, { useState } from 'react';

const AdminPanel = ({ onLogout, onResetApiKey, userLoginInfo }) => {
  const [newApiKey, setNewApiKey] = useState('');

  const handleResetApiKey = () => {
    onResetApiKey(newApiKey);
  };

  return (
    <div className="admin-panel">
      <h2>Welcome to Admin Panel</h2>
      {userLoginInfo && (
        <div>
          <h3>User Details:</h3>
          <p>Email: {userLoginInfo.email}</p>
          <p>Password: {userLoginInfo.password}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="New API Key"
        value={newApiKey}
        onChange={(e) => setNewApiKey(e.target.value)}
      />
      <button onClick={handleResetApiKey}>Reset API Key</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default AdminPanel;