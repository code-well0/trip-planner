import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaMapMarkedAlt,
  FaSuitcase,
  FaMoneyBillWave,
  FaRobot,
  FaPlaneDeparture,
  FaMoon,
  FaSun,
  FaListAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaHeart,
  FaBookOpen,
} from "react-icons/fa";

import { useTheme } from "../contexts/ThemeContext";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
    setMenuOpen(false);
  };

  const navItems = [
    { to: "/plan", icon: FaSuitcase, text: "Plan Trip" },
    { to: "/expenses", icon: FaMoneyBillWave, text: "Expenses" },
    { to: "/api/chat", icon: FaRobot, text: "AI Assistant" },
    {
      to: "/TripRecommender",
      icon: FaPlaneDeparture,
      text: "Trip Recommender",
    },
    { to: "/activity-planner", icon: FaListAlt, text: "Activity Planner" },
    { to: "/interested", icon: FaHeart, text: "Interested", special: true },
    { to: "/blogs", icon: FaBookOpen, text: "Blogs" },
    { to: "/add-blog", icon: FaBookOpen, text: "Add Blog" },
  ];

  // Theme-based classes
  const navbarClasses =
    theme === "dark"
      ? "bg-gray-800 shadow-lg border-b-4 border-blue-400"
      : "bg-white shadow-lg border-b-4 border-blue-500";

  const brandTextClasses =
    theme === "dark"
      ? "text-gray-100 hover:text-blue-400"
      : "text-gray-800 hover:text-blue-600";

  const menuItemClasses =
    theme === "dark"
      ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600";

  const hamburgerClasses =
    theme === "dark"
      ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600";

  const mobileMenuClasses =
    theme === "dark"
      ? "bg-gray-800 shadow-xl border-t border-gray-600"
      : "bg-white shadow-xl border-t border-gray-200";

  const mobileMenuItemClasses =
    theme === "dark"
      ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400 border-transparent hover:border-blue-400"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-transparent hover:border-blue-200";

  const dividerClasses =
    theme === "dark" ? "border-gray-600" : "border-gray-200";

  return (
    <>
      <nav
        className={`${navbarClasses} sticky top-0 z-50 transition-all duration-300`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <FaMapMarkedAlt
                className={
                  theme === "dark"
                    ? "text-blue-400 text-2xl"
                    : "text-blue-600 text-2xl"
                }
              />
              <Link
                to="/"
                className={`text-xl font-bold transition-colors duration-200 ${brandTextClasses}`}
                aria-label="Home"
              ></Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {isLoggedIn ? (
                <>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          item.special
                            ? "text-red-500 hover:text-red-600"
                            : menuItemClasses
                        }`}
                      >
                        <Icon className="text-sm" />
                        <span>{item.text}</span>
                      </Link>
                    );
                  })}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-200 ${hamburgerClasses}`}
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <FaSun className="text-lg" />
                    ) : (
                      <FaMoon className="text-lg" />
                    )}
                  </button>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    aria-label="Profile"
                  >
                    <FaUser className="text-sm" />
                    <span>Profile</span>
                  </Link>
                </>
              ) : (
                <>
                  {/* navBar content when not logged In for desltop menu */}
                  <div className={`w-full flex items-center`}>
                    <a
                      href="/home"
                      className={`${menuItemClasses} space-x-1 px-3 py-2  font-medium rounded-lg transition-all duration-200`}
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className={`${menuItemClasses} space-x-1 px-3 py-2  font-medium rounded-lg transition-all duration-200`}
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className={`${menuItemClasses} space-x-1 px-3 py-2  font-medium rounded-lg transition-all duration-200`}
                    >
                      About
                    </a>
                    <a
                      href="/footer"
                      className={`${menuItemClasses} space-x-1 px-3 py-2  font-medium rounded-lg transition-all duration-200`}
                    >
                      Contact
                    </a>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-200 ${hamburgerClasses}`}
                  >
                    {theme === "dark" ? (
                      <FaSun className="text-lg" />
                    ) : (
                      <FaMoon className="text-lg" />
                    )}
                  </button>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger - Fixed */}
            <div className="md:hidden">
              <button
                className={`p-2 rounded-lg transition-all duration-200 ${hamburgerClasses} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                aria-label="Toggle menu"
                type="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setMenuOpen(!menuOpen);
                  }
                }}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {menuOpen ? (
                    <FaTimes className="w-5 h-5" />
                  ) : (
                    <FaBars className="w-5 h-5" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-16 left-0 right-0 z-50 transition-all duration-300 ${mobileMenuClasses} ${
            menuOpen
              ? "transform translate-y-0 opacity-100 visible"
              : "transform -translate-y-full opacity-0 invisible"
          }`}
        >
          <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {isLoggedIn ? (
              <>
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 border ${
                        item.special
                          ? "text-red-500 hover:text-red-600 border-transparent hover:border-red-200"
                          : mobileMenuItemClasses
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: menuOpen
                          ? "slideInRight 0.3s ease-out forwards"
                          : "none",
                      }}
                    >
                      <Icon className="text-lg flex-shrink-0" />
                      <span>{item.text}</span>
                    </Link>
                  );
                })}
                <div className={`border-t my-4 ${dividerClasses}`} />

                <button
                  onClick={() => {
                    toggleTheme();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 border ${mobileMenuItemClasses}`}
                >
                  {theme === "dark" ? (
                    <FaSun className="text-lg" />
                  ) : (
                    <FaMoon className="text-lg" />
                  )}
                  <span>Toggle Theme</span>
                </button>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <FaUser className="text-lg" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 font-medium mt-2"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* navBar content applied when not logged in for meobile menu */}
                <div className={`w-full flex items-center`}>
                  <a
                    href="/home"
                    className={`${mobileMenuItemClasses} space-x-1 px-3 py-2  font-medium rounded-lg transition-all duration-200`}
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className={`${mobileMenuItemClasses} space-x-1 px-3 py-2  font-medium rounded-lg transition-all duration-200`}
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className={`${mobileMenuItemClasses} space-x-1 px-3 py-2  font-medium rounded-lg transition-all duration-200`}
                  >
                    About
                  </a>
                  <a
                    href="/contact"
                    className={`${mobileMenuItemClasses} space-x-1 px-3 py-2  font-medium rounded-lg transition-all duration-200`}
                  >
                    Contact
                  </a>
                </div>
                <button
                  onClick={() => {
                    toggleTheme();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {theme === "dark" ? (
                    <FaSun className="text-lg" />
                  ) : (
                    <FaMoon className="text-lg" />
                  )}
                  <span>Toggle Theme</span>
                </button>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Custom scrollbar for mobile menu */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${theme === "dark" ? "#374151" : "#f1f5f9"};
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${theme === "dark" ? "#60a5fa" : "#3b82f6"};
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${theme === "dark" ? "#3b82f6" : "#2563eb"};
        }
      `}</style>
    </>
  );
};

export default Navbar;
