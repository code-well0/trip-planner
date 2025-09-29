import  { useState, useRef, useEffect } from "react";
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Standalone menu items (Plan Trip comes before AI Assistant now)
  const standaloneItems = [
    { to: "/plan", text: "Plan Trip" },
    { to: "/api/chat", text: "AI Assistant" },
    { to: "/expenses", text: "Expense Tracker" },
    { to: "/about", text: "About" },
  ];

  // Organized menu structure with dropdowns
  const menuStructure = [
    {
      title: "Tools",
      key: "tools",
      items: [
        { to: "/activity-planner", text: "Activity Planner" },
        { to: "/currency-converter", text: "Currency Converter" },
      ]
    },
    {
      title: "Discover",
      key: "discover",
      items: [
        { to: "/TripRecommender", text: "Trip Recommender" },
        { to: "/blogs", text: "Travel Blogs" },
        { to: "/interested", text: "Wishlist" },
      ]
    },
    {
      title: "Community",
      key: "community",
      items: [
        { to: "/add-blog", text: "Write Blog" },
      ]
    }
  ];

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  // Theme-based classes
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
              />
              <Link
                to="/"
                className={`text-xl font-bold transition-colors duration-200 ${brandTextClasses}`}
                aria-label="Home"
              >
                Trip Planner
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
              {isLoggedIn ? (
                <>
                  {/* Standalone Menu Items */}
                  {standaloneItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${dropdownButtonClasses}`}
                    >
                      {item.text}
                    </Link>
                  ))}

                  {/* Dropdown Menus */}
                  {menuStructure.map((menu) => (
                    <div key={menu.key} className="relative">
                      <button
                        onClick={() => toggleDropdown(menu.key)}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${dropdownButtonClasses} ${
                          activeDropdown === menu.key ? ' text-blue-600' : ''
                        }`}
                        aria-expanded={activeDropdown === menu.key}
                      >
                        <span>{menu.title}</span>
                        <FaChevronDown 
                          className={`text-xs transition-transform duration-200 ${
                            activeDropdown === menu.key ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === menu.key && (
                        <div className={`absolute top-full left-0 mt-1 w-48 rounded-lg border ${dropdownMenuClasses} z-50`}>
                          <div className="py-2">
                            {menu.items.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setActiveDropdown(null)}
                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${dropdownItemClasses}`}
                              >
                                {item.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-200 ${hamburgerClasses}`}
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                  </button>

                  {/* Profile Button */}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    aria-label="Profile"
                  >
                    <FaUser className="text-sm" />
                    <span>Profile</span>
                  </Link>
                </>
              ) : (
                <>
                  {/* Not logged in links */}
                  <Link
                    to="/home"
                    className={`${dropdownButtonClasses} px-4 py-2 rounded-lg font-medium transition-all duration-200`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/plan"
                    className={`${dropdownButtonClasses} px-4 py-2 rounded-lg font-medium transition-all duration-200`}
                  >
                    Plan
                  </Link>
                  
                  <Link
                    to="/about"
                    className={`${dropdownButtonClasses} px-4 py-2 rounded-lg font-medium transition-all duration-200`}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className={`${dropdownButtonClasses} px-4 py-2 rounded-lg font-medium transition-all duration-200`}
                  >
                    Contact
                  </Link>

                  {/* Theme Toggle Button */}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-200 ${hamburgerClasses}`}
                  >
                    {theme === "dark" ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                  </button>

                  {/* Login Button */}
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
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
          <div className="px-4 py-6 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {isLoggedIn ? (
              <>
                {/* Standalone Items */}
                <div className="space-y-2">
                  {standaloneItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${mobileMenuItemClasses}`}
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>

                <div className={`border-t my-4 ${dividerClasses}`} />

                {/* Mobile Dropdown Sections */}
                {menuStructure.map((menu) => (
                  <div key={menu.key} className="space-y-2">
                    <h3 className={`px-2 text-sm font-semibold uppercase tracking-wide ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {menu.title}
                    </h3>
                    {menu.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${mobileMenuItemClasses}`}
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                ))}

                <div className={`border-t my-4 ${dividerClasses}`} />

                <button
                  onClick={() => {
                    toggleTheme();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${mobileMenuItemClasses}`}
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
                  className="w-full flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 font-medium mt-2"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Not logged in mobile menu */}
                <div className="space-y-2">
                  <Link
                    to="/home"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${mobileMenuItemClasses}`}
                  >
                    Home
                  </Link>
                  <Link
                    to="#"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${mobileMenuItemClasses}`}
                  >
                    Features
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${mobileMenuItemClasses}`}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${mobileMenuItemClasses}`}
                  >
                    Contact
                  </Link>
                </div>

                <div className={`border-t my-4 ${dividerClasses}`} />

                <button
                  onClick={() => {
                    toggleTheme();
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${mobileMenuItemClasses}`}
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
