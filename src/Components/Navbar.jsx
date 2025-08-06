import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaSuitcase, FaMoneyBillWave, FaRobot, FaPlaneDeparture } from "react-icons/fa";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md font-inter">
      {/* 🔰 Brand Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
        <FaMapMarkedAlt className="text-3xl" />
        <Link to="/">YourTripPlanner</Link>
      </div>

      {/* 🧭 Navigation Links */}
      <div className="flex space-x-6 items-center text-gray-700 font-medium">
        {isLoggedIn ? (
          <>
            <Link to="/plan" className="hover:text-blue-600 transition duration-200 flex items-center gap-1">
              <FaSuitcase /> Plan Trip
            </Link>
            <Link to="/expenses" className="hover:text-blue-600 transition duration-200 flex items-center gap-1">
              <FaMoneyBillWave /> Expenses
            </Link>
            <Link to="/api/chat" className="hover:text-blue-600 transition duration-200 flex items-center gap-1">
              <FaRobot /> AI Assistant
            </Link>
            <Link to="/TripRecommender" className="hover:text-blue-600 transition duration-200 flex items-center gap-1">
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
