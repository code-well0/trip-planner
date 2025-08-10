import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaSuitcase, FaMoneyBillWave, FaRobot, FaPlaneDeparture } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook

const Navbar = ({ isLoggedIn, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  // Use the custom hook to get the current theme and the toggle function
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md font-inter transition-colors duration-300">
      {/* 🔰 Brand Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
        <FaMapMarkedAlt className="text-3xl" />
        <Link to="/">YourTripPlanner</Link>
      </div>

      {/* 🔷 Right: Navigation Links */}
      <div className="flex space-x-6 items-center text-gray-700 dark:text-gray-300 font-medium">
        {isLoggedIn ? (
          <>
            <input 
              type="text"
              placeholder="Search by city name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300"
            />
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none"
            >
              {theme === 'light' ? (
                // Sun Icon (visible in light mode)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon Icon (visible in dark mode)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <Link to="/plan" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 flex items-center gap-1">
              <FaSuitcase /> Plan Trip
            </Link>
            <Link to="/expenses" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 flex items-center gap-1">
              <FaMoneyBillWave /> Expenses
            </Link>
            <Link to="/api/chat" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 flex items-center gap-1">
              <FaRobot /> AI Assistant
            </Link>
            <Link to="/TripRecommender" className="hover:text-blue-600 dark:hover:text-blue-400 transition duration-200 flex items-center gap-1">
              <FaPlaneDeparture /> Trip Recommender
            </Link>

            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
