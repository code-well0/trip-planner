import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt, FaSuitcase, FaMoneyBillWave, FaRobot,
  FaPlaneDeparture, FaMoon, FaSun, FaListAlt, FaUser, FaBars, FaTimes , FaHeart
} from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';
import "./Navbar.css";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar-brand">
        <FaMapMarkedAlt className="brand-icon" />
        <Link to="/" className="brand-text">YourTripPlanner</Link>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="menu-toggle md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Menu */}
      <div className="nav-links hidden md:flex">
        {isLoggedIn ? (
          <>
            <Link to="/plan"><FaSuitcase /> Plan Trip</Link>
            <Link to="/expenses"><FaMoneyBillWave /> Expenses</Link>
            <Link to="/api/chat"><FaRobot /> AI Assistant</Link>
            <Link to="/TripRecommender"><FaPlaneDeparture /> Trip Recommender</Link>
            <Link to="/activity-planner"><FaListAlt /> Activity Planner</Link>
             <Link to="/interested"><FaHeart className="text-red-500" /> Interested</Link> 
            <button onClick={toggleTheme} className="theme-btn">
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <Link to="/profile" className="profile-btn"><FaUser /> Profile</Link>
          </>
        ) : (
          <>
            <button onClick={toggleTheme} className="theme-btn">
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <Link to="/login" className="login-btn">Login</Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu md:hidden">
          {isLoggedIn ? (
            <>
              <Link to="/plan" onClick={() => setMenuOpen(false)}><FaSuitcase /> Plan Trip</Link>
              <Link to="/expenses" onClick={() => setMenuOpen(false)}><FaMoneyBillWave /> Expenses</Link>
              <Link to="/api/chat" onClick={() => setMenuOpen(false)}><FaRobot /> AI Assistant</Link>
              <Link to="/TripRecommender" onClick={() => setMenuOpen(false)}><FaPlaneDeparture /> Trip Recommender</Link>
              <Link to="/activity-planner" onClick={() => setMenuOpen(false)}><FaListAlt /> Activity Planner</Link>
                 <Link to="/interested" onClick={() => setMenuOpen(false)}><FaHeart className="text-red-500" /> Interested</Link>
              <button onClick={() => { toggleTheme(); setMenuOpen(false); }}>
                {theme === 'dark' ? <FaSun /> : <FaMoon />} Toggle Theme
              </button>
              <Link to="/profile" onClick={() => setMenuOpen(false)}><FaUser /> Profile</Link>
            </>
          ) : (
            <>
              <button onClick={() => { toggleTheme(); setMenuOpen(false); }}>
                {theme === 'dark' ? <FaSun /> : <FaMoon />} Toggle Theme
              </button>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;