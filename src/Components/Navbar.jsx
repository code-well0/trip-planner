import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaMapMarkedAlt,
  FaMoon,
  FaSun,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import { useTheme } from "../contexts/ThemeContext";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
    setMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const standaloneItems = [
    { to: "/plan", text: "Plan Trip" },
    { to: "/api/chat", text: "AI Assistant" },
    { to: "/expenses", text: "Expense Tracker" },
    { to: "/about", text: "About" },
  ];

  const menuStructure = [
    {
      title: "Tools",
      key: "tools",
      items: [
        { to: "/activity-planner", text: "Activity Planner" },
        { to: "/currency-converter", text: "Currency Converter" },
      ],
    },
    {
      title: "Discover",
      key: "discover",
      items: [
        { to: "/TripRecommender", text: "Trip Recommender" },
        { to: "/blogs", text: "Travel Blogs" },
        { to: "/interested", text: "Wishlist" },
      ],
    },
    {
      title: "Community",
      key: "community",
      items: [{ to: "/add-blog", text: "Write Blog" }],
    },
  ];

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const navbarClasses =
    theme === "dark"
      ? "bg-gray-800 shadow-lg border-b border-gray-700"
      : "bg-white shadow-lg border-b border-gray-200";

  const brandTextClasses =
    theme === "dark"
      ? "text-gray-100 hover:text-blue-400"
      : "text-gray-800 hover:text-blue-600";

  const dropdownButtonClasses =
    theme === "dark"
      ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600";

  const dropdownMenuClasses =
    theme === "dark"
      ? "bg-gray-800 border-gray-600 shadow-xl"
      : "bg-white border-gray-200 shadow-xl";

  const dropdownItemClasses =
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
      ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600";

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
                aria-hidden="true"
              />
              <Link
                to="/"
                className={`text-xl font-bold transition-colors duration-200 ${brandTextClasses}`}
                aria-label="Home - Trip Planner"
              >
                Trip Planner
              </Link>
            </div>

            {/* Desktop Menu */}
            <div
              className="hidden md:flex items-center space-x-1"
              ref={dropdownRef}
            >
              {isLoggedIn ? (
                <>
                  {standaloneItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${dropdownButtonClasses}`}
                      aria-label={item.text}
                    >
                      {item.text}
                    </Link>
                  ))}

                  {menuStructure.map((menu) => (
                    <div key={menu.key} className="relative">
                      <button
                        onClick={() => toggleDropdown(menu.key)}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${dropdownButtonClasses}`}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === menu.key}
                        aria-label={`${menu.title} menu`}
                      >
                        <span>{menu.title}</span>
                        <FaChevronDown
                          aria-hidden="true"
                          className={`text-xs transition-transform duration-200 ${
                            activeDropdown === menu.key ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === menu.key && (
                        <div
                          className={`absolute top-full left-0 mt-1 w-48 rounded-lg border ${dropdownMenuClasses} z-50`}
                          role="menu"
                          aria-label={`${menu.title} options`}
                        >
                          <div className="py-2">
                            {menu.items.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setActiveDropdown(null)}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${dropdownItemClasses}`}
                                role="menuitem"
                                aria-label={item.text}
                              >
                                {item.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${hamburgerClasses}`}
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <FaSun className="text-lg" aria-hidden="true" />
                    ) : (
                      <FaMoon className="text-lg" aria-hidden="true" />
                    )}
                  </button>

                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Profile"
                  >
                    <FaUser className="text-sm" aria-hidden="true" />
                    <span>Profile</span>
                  </Link>
                </>
              ) : (
                <>
                  {/* Not logged in links */}
                  <Link
                    to="/home"
                    className={`${dropdownButtonClasses} px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    aria-label="Home"
                  >
                    Home
                  </Link>
                  <Link
                    to="#"
                    className={`${dropdownButtonClasses} px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    aria-label="Features"
                  >
                    Features
                  </Link>
                  <Link
                    to="/about"
                    className={`${dropdownButtonClasses} px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    aria-label="About"
                  >
                    About
                  </Link>
                  <Link
                    to="/footer"
                    className={`${dropdownButtonClasses} px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    aria-label="Contact"
                  >
                    Contact
                  </Link>

                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${hamburgerClasses}`}
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? (
                      <FaSun className="text-lg" aria-hidden="true" />
                    ) : (
                      <FaMoon className="text-lg" aria-hidden="true" />
                    )}
                  </button>

                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Login"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hamburgerClasses}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                aria-label="Toggle mobile menu"
                type="button"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {menuOpen ? (
                    <FaTimes className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <FaBars className="w-5 h-5" aria-hidden="true" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Rest of your Mobile Menu code unchanged but add aria-labels & focus:ring in same pattern */}
      </nav>
    </>
  );
};

export default Navbar;
