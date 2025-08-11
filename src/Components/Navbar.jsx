import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaSuitcase, FaMoneyBillWave, FaRobot, FaPlaneDeparture } from "react-icons/fa";

const Navbar = ({ isLoggedIn, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  // Check if we are on landing, login, or signup page
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 shadow-md font-inter">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-white">
        <FaMapMarkedAlt className="text-3xl" />
        <Link to="/">YourTripPlanner</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 items-center text-white font-medium">
        {isLoggedIn ? (
          <>
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by city name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Link to="/plan" className="hover:text-yellow-300 flex items-center gap-1">
              <FaSuitcase /> Plan Trip
            </Link>
            <Link to="/expenses" className="hover:text-yellow-300 flex items-center gap-1">
              <FaMoneyBillWave /> Expenses
            </Link>
            <Link to="/api/chat" className="hover:text-yellow-300 flex items-center gap-1">
              <FaRobot /> AI Assistant
            </Link>
            <Link to="/TripRecommender" className="hover:text-yellow-300 flex items-center gap-1">
              <FaPlaneDeparture /> Trip Recommender
            </Link>
            <button
              onClick={handleLogout}
              className="logout-btn ml-4"
            >
              Logout
            </button>
          </>
        ) : isAuthPage ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 text-white rounded hover:green-900 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-green-500 text-white rounded hover:green-900 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          // If not logged in and trying to access restricted page
          <Link
            to="/login"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-900 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;