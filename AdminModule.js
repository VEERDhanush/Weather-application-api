import React, { useState } from 'react';

const AdminModule = ({ onSetApiKey }) => {
  const [apiKey, setApiKey] = useState('');

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSetApiKey = () => {
    onSetApiKey(apiKey);
  };

  return (
    <div className="admin-module">
      <h2>Admin Module</h2>
      <input 
        type="text" 
        placeholder="Enter API Key" 
        value={apiKey} 
        onChange={handleApiKeyChange}
      />
      <button onClick={handleSetApiKey}>Set API Key</button>
    </div>
  );
};

export default AdminModule;