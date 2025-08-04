import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <div className="footer-brand">
              <h3>YourTripPlanner</h3>
              <p>Your ultimate companion for exploring the incredible destinations of India. Plan smarter, travel better.</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/destinations">Destinations</a></li>
              <li><a href="/chatbot">AI Assistant</a></li>
              <li><a href="/expenses">Expense Tracker</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="footer-section">
            <h4>Popular Destinations</h4>
            <ul className="footer-links">
              <li><a href="/destinations/goa">🏖️ Goa</a></li>
              <li><a href="/destinations/kerala">🌴 Kerala</a></li>
              <li><a href="/destinations/rajasthan">🏰 Rajasthan</a></li>
              <li><a href="/destinations/himachal">🏔️ Himachal Pradesh</a></li>
              <li><a href="/destinations/kashmir">❄️ Kashmir</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/faq">FAQ</a></li>
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
              <a href="/sitemap">Sitemap</a>
              <span>|</span>
              <a href="/accessibility">Accessibility</a>
              <span>|</span>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;