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

  // ✅ Mobile links (green) vs Desktop links (original)
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
              mobile ? "" : "hover:text-blue-600"
            }`}
            style={mobile ? { color: "#218838" } : {}}
          >
            <FaSuitcase /> Plan Trip
          </Link>
          <Link
            to="/expenses"
            className={`flex items-center gap-1 transition duration-200 ${
              mobile ? "" : "hover:text-blue-600"
            }`}
            style={mobile ? { color: "#218838" } : {}}
          >
            <FaMoneyBillWave /> Expenses
          </Link>
          <Link
            to="/api/chat"
            className={`flex items-center gap-1 transition duration-200 ${
              mobile ? "" : "hover:text-blue-600"
            }`}
            style={mobile ? { color: "#218838" } : {}}
          >
            <FaRobot /> AI Assistant
          </Link>
          <Link
            to="/TripRecommender"
            className={`flex items-center gap-1 transition duration-200 ${
              mobile ? "" : "hover:text-blue-600"
            }`}
            style={mobile ? { color: "#218838" } : {}}
          >
            <FaPlaneDeparture /> Trip Recommender
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className={`px-4 py-2 text-white rounded transition duration-200 ${
            mobile ? "" : "bg-blue-500 hover:bg-blue-600"
          }`}
          style={mobile ? { backgroundColor: "#218838" } : {}}
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 bg-white shadow-md font-inter relative">
      {/* 🔰 Brand Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-blue-300">
        <FaMapMarkedAlt className="text-3xl" />
        <Link to="/">YourTripPlanner</Link>
      </div>


      {/* 🔷 Right: Navigation Links */}
      <div className="flex space-x-6 items-center text-gray-700 font-medium">
        {isLoggedIn ? (
          <>
            <input
              type="text"
              placeholder="Search by city name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link
              to="/plan"
              className="hover:text-blue-600 transition duration-200 flex items-center gap-1"
            >
              <FaSuitcase /> Plan Trip
            </Link>
            <Link
              to="/expenses"
              className="hover:text-blue-600 transition duration-200 flex items-center gap-1"
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
              className="hover:text-blue-600 transition duration-200 flex items-center gap-1"
            >
              <FaRobot /> AI Assistant
            </Link>
            <Link
              to="/TripRecommender"
              className="hover:text-blue-600 transition duration-200 flex items-center gap-1"
            >
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

      {/* 🔳 Hamburger Button for Mobile */}
      <button
        className="lg:hidden text-2xl"
        onClick={toggleMenu}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* 🔷 Desktop Links (unchanged) */}
      <div className="hidden lg:flex space-x-6 items-center text-gray-700 font-medium">
        <NavLinks />
      </div>

      {/* 📱 Mobile Menu (green text) */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-4 px-6 py-4 font-medium z-50">
          <NavLinks mobile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
