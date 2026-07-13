import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Elite Founder Hub</h1>
            <p>Connect with successful founders, access resources, and grow your startup</p>
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">Get Started</Link>
              <Link to="/founders" className="btn btn-secondary">Browse Founders</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card card">
              <h3>📚 Resources</h3>
              <p>Access a curated collection of resources for founders including funding tips, tools, and learning materials.</p>
            </div>
            <div className="feature-card card">
              <h3>👥 Founder Network</h3>
              <p>Connect with other founders, share experiences, and build meaningful relationships in the startup ecosystem.</p>
            </div>
            <div className="feature-card card">
              <h3>💡 Knowledge Hub</h3>
              <p>Learn from industry experts and successful founders through guides, case studies, and best practices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
