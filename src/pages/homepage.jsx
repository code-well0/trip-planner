import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Trip Planner</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#home" className="nav-link active">Home</a>
            </li>
            <li className="nav-item">
              <a href="#plan-trip" className="nav-link">Plan Trip</a>
            </li>
            <li className="nav-item">
              <a href="#expense-tracker" className="nav-link">Expense Tracker</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Plan Your Next Adventure</h1>
          <p className="hero-subtitle">
            Discover amazing places and create unforgettable memories across India
          </p>
          <button className="cta-button">Start Planning →</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Trip Planner?</h2>
          <div className="cards-grid">
            <div className="feature-card">
              <div className="card-icon">🗺️</div>
              <h3 className="card-title">Interactive Destination Discovery</h3>
              <p className="card-description">
                Explore popular Indian tourist destinations with an interactive list of cities, 
                each displayed with matching emojis that reflect their unique culture and vibe.
              </p>
            </div>

            <div className="feature-card">
              <div className="card-icon">🌍</div>
              <h3 className="card-title">Regional Filtering</h3>
              <p className="card-description">
                Filter destinations by geographic regions - North, South, East, and West India. 
                Quickly narrow down choices and find your perfect travel spot.
              </p>
            </div>

            <div className="feature-card">
              <div className="card-icon">💰</div>
              <h3 className="card-title">Expense Tracking</h3>
              <p className="card-description">
                Keep track of your travel expenses with our built-in expense tracker. 
                Plan your budget and monitor spending throughout your journey.
              </p>
            </div>

        
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3>Choose Your Region</h3>
                <p>Select from North, South, East, or West India to explore destinations in your preferred area.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3>Discover Destinations</h3>
                <p>Browse through curated lists of popular tourist spots with emoji indicators for quick recognition.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3>Plan Your Trip</h3>
                <p>Create detailed itineraries and organize your travel plans with our planning tools.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <h3>Track Expenses</h3>
                <p>Monitor your spending and stay within budget with our integrated expense tracking feature.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Trip Planner</h4>
              <p>Your ultimate companion for exploring the incredible destinations of India.</p>
            </div>
            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li>Destination Discovery</li>
                <li>Trip Planning</li>
                <li>Expense Tracking</li>
                <li>Regional Filtering</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Regions</h4>
              <ul>
                <li>North India</li>
                <li>South India</li>
                <li>East India</li>
                <li>West India</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Trip Planner. All rights reserved.</p>
          </div>
        </div>
      </footer>

      
    </div>
  );
};

export default HomePage;