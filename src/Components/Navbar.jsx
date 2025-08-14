import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaSuitcase, FaMoneyBillWave, FaRobot, FaPlaneDeparture, FaMoon, FaSun, FaListAlt } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';

const Navbar = ({ isLoggedIn, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 bg-white shadow-md font-inter dark:bg-gray-800 dark:text-white transition-colors duration-300">
      {/* 🔰 Brand Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-white">
        <FaMapMarkedAlt className="text-3xl" />
        <Link to="/">YourTripPlanner</Link>
      </div>

      {/* 🔷 Right: Navigation Links */}
      <div className="flex space-x-6 items-center text-gray-700 font-medium dark:text-gray-300">
        {isLoggedIn ? (
          <>
            <Link to="/plan" className="hover:text-blue-600 transition duration-200 flex items-center gap-1 dark:hover:text-blue-400">
              <FaSuitcase /> Plan Trip
            </Link>
            <Link to="/expenses" className="hover:text-blue-600 transition duration-200 flex items-center gap-1 dark:hover:text-blue-400">
              <FaMoneyBillWave /> Expenses
            </Link>
            <Link to="/api/chat" className="hover:text-blue-600 transition duration-200 flex items-center gap-1 dark:hover:text-blue-400">
              <FaRobot /> AI Assistant
            </Link>
            <Link to="/TripRecommender" className="hover:text-blue-600 transition duration-200 flex items-center gap-1 dark:hover:text-blue-400">
              <FaPlaneDeparture /> Trip Recommender
            </Link>
            {/* Activity Planner Link */}
            <Link to="/activity-planner" className="hover:text-blue-600 transition duration-200 flex items-center gap-1 dark:hover:text-blue-400">
              <FaListAlt /> Activity Planner
            </Link>
            
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="px-4 py-2 ml-4 bg-gray-200 text-gray-700 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>

            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 ml-4 bg-gray-200 text-gray-700 rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
