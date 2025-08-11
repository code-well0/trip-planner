import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaSuitcase,
  FaMoneyBillWave,
  FaRobot,
  FaPlaneDeparture,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = ({ isLoggedIn, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const NavLinks = ({ mobile = false }) => (
    <>
      {isLoggedIn ? (
        <>
          <input
            type="text"
            placeholder="Search by city name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 ${
              mobile ? "w-full" : "w-auto"
            }`}
            style={mobile ? { borderColor: "#218838" } : {}}
          />
          <Link
            to="/plan"
            className={`flex items-center gap-1 transition duration-200 ${
              mobile ? "text-green-700" : "hover:text-blue-600"
            }`}
          >
            <FaSuitcase /> Plan Trip
          </Link>
          <Link
            to="/expenses"
            className={`flex items-center gap-1 transition duration-200 ${
              mobile ? "text-green-700" : "hover:text-blue-600"
            }`}
          >
            <FaMoneyBillWave /> Expenses
          </Link>

          <Link
            to="/faqs"
            className="hover:text-blue-600 transition duration-200"
          >
            FAQs
          </Link>
          <Link
            to="/api/chat"
            className={`flex items-center gap-1 transition duration-200 ${
              mobile ? "text-green-700" : "hover:text-blue-600"
            }`}
          >
            <FaRobot /> AI Assistant
          </Link>
          <Link
            to="/TripRecommender"
            className={`flex items-center gap-1 transition duration-200 ${
              mobile ? "text-green-700" : "hover:text-blue-600"
            }`}
          >
            <FaPlaneDeparture /> Trip Recommender
          </Link>
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded ${
              mobile
                ? "bg-red-600 text-white"
                : "ml-4 bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className={`px-4 py-2 rounded ${
            mobile
              ? "bg-green-600 text-white w-full text-center"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 bg-white shadow-md font-inter relative">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-300">
        <FaMapMarkedAlt className="text-3xl" />
        <Link to="/">YourTripPlanner</Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex space-x-6 items-center text-gray-700 font-medium">
        <NavLinks />
      </div>

      {/* Hamburger Button for mobile */}
      <button className="lg:hidden text-2xl" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 px-6 py-4 font-medium z-50">
          <NavLinks mobile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
