import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook
import './Footer.css';

const Footer = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  // Use the custom hook to get the current theme
  const { theme } = useTheme();

  // 🔐 Intercept protected link clicks if not logged in
  const handleProtectedClick = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    // Conditionally add a 'dark-theme' class based on the current theme
    <footer className={`footer ${theme === 'dark' ? 'dark-theme-footer' : ''}`}>
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <h3>YourTripPlanner</h3>
              <p>Your ultimate companion for exploring the incredible destinations of India. Plan smarter, travel better.</p>
            </div>
            <div className="social-links">
              <a href="mailto:shubralijain@gmail.com" className="social-link">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="https://github.com/code-well0" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.instagram.com/_shubrali/" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/shubrali-jain/" className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/plan" onClick={(e) => handleProtectedClick(e, '/plan')}>
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/api/chat" onClick={(e) => handleProtectedClick(e, '/api/chat')}>
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/expenses" onClick={(e) => handleProtectedClick(e, '/expenses')}>
                  Expense Tracker
                </Link>
              </li>
              <li>
                <Link to="/TripRecommender" onClick={(e) => handleProtectedClick(e, '/TripRecommender')}>
                  Trip Recommender
                </Link>
              </li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="footer-section">
            <h4>Popular Destinations</h4>
            <ul className="footer-links">
              <li><Link to="/destinations/goa">🏖️ Goa</Link></li>
              <li><Link to="/destinations/kerala">🌴 Kerala</Link></li>
              <li><Link to="/destinations/rajasthan">🏰 Rajasthan</Link></li>
              <li><Link to="/destinations/himachal">🏔️ Himachal Pradesh</Link></li>
              <li><Link to="/destinations/kashmir">❄️ Kashmir</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4>Stay Updated</h4>
            <p>Subscribe to get the latest travel tips and destination updates.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 YourTripPlanner. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/sitemap">Sitemap</Link>
              <span>|</span>
              <Link to="/accessibility">Accessibility</Link>
              <span>|</span>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
