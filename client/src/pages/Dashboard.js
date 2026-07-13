import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard({ user }) {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome, {user.firstName}!</h1>
          <p>Your Dashboard</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card card">
            <h3>Profile</h3>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button className="btn btn-primary">Edit Profile</button>
          </div>

          <div className="dashboard-card card">
            <h3>Quick Stats</h3>
            <div className="stats">
              <div className="stat">
                <span className="stat-value">0</span>
                <span className="stat-label">Resources Shared</span>
              </div>
              <div className="stat">
                <span className="stat-value">0</span>
                <span className="stat-label">Connections</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card card">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/founders">Browse Founders</a></li>
              <li><a href="/resources">View Resources</a></li>
              <li><a href="/">Back Home</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
