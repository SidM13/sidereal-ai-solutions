import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Founders.css';

function Founders() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFounders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/founders');
        setFounders(response.data);
      } catch (err) {
        setError('Failed to load founders');
      } finally {
        setLoading(false);
      }
    };

    fetchFounders();
  }, []);

  if (loading) return <div className="container mt-3">Loading founders...</div>;
  if (error) return <div className="container mt-3 error">{error}</div>;

  return (
    <div className="founders-page">
      <div className="container">
        <h1>Founder Network</h1>
        <p className="subtitle">Connect with innovative founders</p>

        <div className="founders-grid">
          {founders.map(founder => (
            <div key={founder._id} className="founder-card card">
              <div className="founder-header">
                <h3>{founder.firstName} {founder.lastName}</h3>
                <p className="founder-email">{founder.email}</p>
              </div>
              {founder.profile && (
                <div className="founder-details">
                  {founder.profile.company && (
                    <p><strong>Company:</strong> {founder.profile.company}</p>
                  )}
                  {founder.profile.role && (
                    <p><strong>Role:</strong> {founder.profile.role}</p>
                  )}
                  {founder.profile.industry && (
                    <p><strong>Industry:</strong> {founder.profile.industry}</p>
                  )}
                  {founder.profile.bio && (
                    <p><strong>Bio:</strong> {founder.profile.bio}</p>
                  )}
                </div>
              )}
              <button className="btn btn-primary">Connect</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Founders;
