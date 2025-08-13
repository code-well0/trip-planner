import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaSuitcase,
  FaMoneyBillWave,
  FaRobot,
  FaPlaneDeparture,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = ({ isLoggedIn, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Check if we’re on auth pages
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  const NavLinks = ({ mobile = false }) => (
    <>
      {isLoggedIn ? (
        <>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by city name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`px-4 py-2 border rounded-full focus:outline-none focus:ring-2 ${
              mobile ? "w-full border-green-600" : "w-auto border-gray-300"
            }`}
          />
          <Link to="/plan" className={flex items-center gap-1 transition duration-200 ${mobile ? "text-green-700" : "hover:text-blue-600 dark:hover:text-blue-400"}}>
            <FaSuitcase /> Plan Trip
          </Link>
          <Link to="/expenses" className={flex items-center gap-1 transition duration-200 ${mobile ? "text-green-700" : "hover:text-blue-600 dark:hover:text-blue-400"}}>
            <FaMoneyBillWave /> Expenses
          </Link>
          <Link to="/api/chat" className={flex items-center gap-1 transition duration-200 ${mobile ? "text-green-700" : "hover:text-blue-600 dark:hover:text-blue-400"}}>
            <FaRobot /> AI Assistant
          </Link>
          <Link to="/TripRecommender" className={flex items-center gap-1 transition duration-200 ${mobile ? "text-green-700" : "hover:text-blue-600 dark:hover:text-blue-400"}}>
            <FaPlaneDeparture /> Trip Recommender
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={px-4 py-2 ${mobile ? "bg-gray-200 text-gray-700" : "ml-4 bg-gray-200 text-gray-700"} rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={handleLogout}
            className={px-4 py-2 rounded ${mobile ? "bg-red-500 text-white hover:bg-red-600" : "ml-4 bg-red-500 text-white hover:bg-red-600"} transition duration-200}
          >
            Logout
          </button>
        </>
      ) : isAuthPage ? (
        <>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={px-4 py-2 ${mobile ? "bg-gray-200 text-gray-700" : "ml-4 bg-gray-200 text-gray-700"} rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <Link
            to="/login"
            className={px-4 py-2 rounded ${mobile ? "bg-green-600 text-white hover:bg-green-800" : "bg-green-500 text-white hover:bg-green-700"} transition duration-200}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={px-4 py-2 rounded ${mobile ? "bg-green-600 text-white hover:bg-green-800" : "bg-green-500 text-white hover:bg-green-700"} transition duration-200}
          >
            Sign Up
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={toggleTheme}
            className={px-4 py-2 ${mobile ? "bg-gray-200 text-gray-700" : "ml-4 bg-gray-200 text-gray-700"} rounded-full dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <Link
            to="/login"
            className={px-4 py-2 rounded ${mobile ? "bg-green-600 text-white hover:bg-green-800" : "bg-green-500 text-white hover:bg-green-700"} transition duration-200}
          >
            Login
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 bg-white shadow-md font-inter dark:bg-gray-800 dark:text-white transition-colors duration-300 relative">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-600 dark:text-white">
        <FaMapMarkedAlt className="text-3xl" />
        <Link to="/">YourTripPlanner</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden text-2xl" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Links */}
      <div className="hidden lg:flex space-x-6 items-center text-gray-700 font-medium dark:text-gray-300">
        <NavLinks />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md flex flex-col gap-4 px-6 py-4 font-medium z-50">
          <NavLinks mobile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;