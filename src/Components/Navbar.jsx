import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaPlane, FaHome, FaCalculator, FaRobot, FaUser, FaThumbsUp } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar({ isLoggedIn }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-brand">
        <NavLink to={isLoggedIn ? "/home" : "/"} className="brand-link" onClick={closeMobileMenu}>
          <FaPlane className="navbar-logo" />
          <span className="brand-text">YourTripPlanner</span>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className={`navbar-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink to={isLoggedIn ? "/home" : "/"} className="nav-link" onClick={closeMobileMenu}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </NavLink>

        {isLoggedIn && (
          <>
            <NavLink to="/plan" className="nav-link" onClick={closeMobileMenu}>
              <FaPlane className="nav-icon" />
              <span>Plan Trip</span>
            </NavLink>
            <NavLink to="/expenses" className="nav-link" onClick={closeMobileMenu}>
              <FaCalculator className="nav-icon" />
              <span>Expenses</span>
            </NavLink>
            <NavLink to="/api/chat" className="nav-link" onClick={closeMobileMenu}>
              <FaRobot className="nav-icon" />
              <span>AI Assistant</span>
            </NavLink>
            <NavLink to="/trip-recommender" className="nav-link" onClick={closeMobileMenu}>
              <FaThumbsUp className="nav-icon" />
              <span>Trip Recommender</span>
            </NavLink>
            <NavLink to="/profile" className="nav-link profile-link" onClick={closeMobileMenu}>
              <FaUser className="nav-icon" />
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div 
        className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}
