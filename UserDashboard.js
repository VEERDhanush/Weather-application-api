import React from 'react';

const UserDashboard = ({ onLogout }) => {
  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      {/* Your user dashboard content goes here */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserDashboard;