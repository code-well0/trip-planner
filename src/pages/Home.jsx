import React from 'react';
import '../index.css';

export default function Home() {
  return (
    <div className="home-page-container">
      <div className="home-content">
        <div className="home-card">
          <div className="home-icon">🏠</div>
          <h1 className="home-title">Home Page</h1>
          <p className="home-message">
            This home page is not created yet, but it's coming soon!
          </p>
          <div className="home-features">
            <div className="feature-item">
              <span className="feature-icon">✨</span>
              <span>Beautiful Dashboard</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Trip Analytics</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🗺️</span>
              <span>Quick Planning Tools</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span>Personalized Recommendations</span>
            </div>
          </div>
          <div className="home-cta">
            <p>Meanwhile, explore our other features:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
