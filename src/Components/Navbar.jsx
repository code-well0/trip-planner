import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 

import {
  FaMapMarkedAlt,
  FaMoon,
  FaSun,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";

import { useTheme } from "../contexts/ThemeContext";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
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
      // Logic to close the desktop dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      
      // Logic to close the mobile menu if clicking outside the menu panel
      const isMobileMenuClick = event.target.closest('.mobile-menu-content');
      const isHamburgerClick = event.target.closest('.hamburger-button');

      if (menuOpen && !isMobileMenuClick && !isHamburgerClick) {
          setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]); 

  // Standalone menu items 
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
        { to: "/weather", text: "Weather" },
        {to: "/packing-list", text: "Pack Master"},
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
      ? "bg-gray-900 shadow-2xl border-l border-gray-700"
      : "bg-white shadow-2xl border-l border-gray-200";

  const mobileMenuItemClasses =
    theme === "dark"
      ? "text-gray-200 hover:bg-gray-700 hover:text-blue-400"
      : "text-gray-800 hover:bg-blue-50 hover:text-blue-600";
    
  const mobileActiveItemClasses = "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700";

  const dividerClasses =
    theme === "dark" ? "border-gray-600" : "border-gray-200";
    
  // Function to determine if a link is active for mobile menu
  const getMobileLinkClasses = (to) => {
    const isActive = location.pathname === to;
    return isActive 
        ? mobileActiveItemClasses 
        : mobileMenuItemClasses;
  };

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
            <div className="flex items-center space-x-2 flex-shrink-0"
            onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });}}
            >
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
                      // ACTIVE STYLING FOR DESKTOP
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${dropdownButtonClasses} ${location.pathname === item.to ? 'text-blue-600 bg-blue-100 dark:bg-gray-700 dark:text-blue-400' : ''}`} 
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
                                // ACTIVE STYLING FOR DROPDOWN ITEMS
                                className={`block px-4 py-2 text-sm transition-colors duration-200 ${dropdownItemClasses} ${location.pathname === item.to ? 'bg-blue-50 dark:bg-gray-700 font-semibold' : ''}`} 
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-gray-100 hover:text-blue-700  transition-colors duration-200 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-gray-100 hover:text-blue-700  transition-colors duration-200 font-medium"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button - ENHANCED & FIXED FOR VISIBILITY */}
            <div className="md:hidden">
              <button
                className={`hamburger-button w-10 h-10 flex flex-col justify-center items-center rounded-full transition-all duration-200 ${hamburgerClasses} focus:outline-none focus:ring-2 focus:ring-blue-500 relative z-50`} 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                type="button"
              >
                {/* 1. TOP BAR: Fixed visibility with explicit colors */}
                <span 
                  className={`block h-0.5 w-6 bg-gray-800 dark:bg-gray-100 transform transition duration-300 ease-in-out 
                    ${menuOpen ? 'rotate-45 translate-y-2.5' : '-translate-y-1.5'}`} 
                />
                {/* 2. MIDDLE BAR: Fixed visibility with explicit colors */}
                <span 
                  className={`block h-0.5 w-6 bg-gray-800 dark:bg-gray-100 transform transition duration-300 ease-in-out my-0.5 
                    ${menuOpen ? 'opacity-0' : ''}`}
                />
                {/* 3. BOTTOM BAR: Fixed visibility with explicit colors */}
                <span 
                  className={`block h-0.5 w-6 bg-gray-800 dark:bg-gray-100 transform transition duration-300 ease-in-out 
                    ${menuOpen ? '-rotate-45 -translate-y-2.5' : 'translate-y-1.5'}`} 
                />
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

        {/* Mobile Menu Container - ENHANCED FOR SLIDE FROM RIGHT */}
        <div
          className={`mobile-menu-content md:hidden fixed top-0 right-0 h-full w-80 max-w-[80vw] z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuClasses} 
            ${menuOpen ? "translate-x-0" : "translate-x-full"}`} 
        >
          {/* Menu Header with Close Button */}
          <div className={`flex justify-between items-center h-16 px-4 py-6 border-b ${dividerClasses}`}>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Menu</h2>
            <button
              className={`p-2 rounded-full transition-all duration-200 ${hamburgerClasses} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              {/* SVG for the X icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
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
                      // Added py-3 padding for better spacing
                      className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getMobileLinkClasses(item.to)}`} 
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
                        // Added py-3 padding for better spacing
                        className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getMobileLinkClasses(item.to)}`} 
                      >
                        {item.text}
                      </Link>
                    ))}
                  </div>
                ))}

                <div className={`border-t my-4 ${dividerClasses}`} />
                
                {/* Theme Toggle Button (Improved with icon and text) */}
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

                {/* Profile Button */}
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
              // Not logged in mobile menu items (Updated with active logic)
              <>
                <div className="space-y-2">
                  <Link
                    to="/home"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getMobileLinkClasses('/home')}`}
                  >
                    Home
                  </Link>
                  <Link
                    to="#"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getMobileLinkClasses('#')}`}
                  >
                    Features
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getMobileLinkClasses('/about')}`}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getMobileLinkClasses('/contact')}`}
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
        /* This style block ensures the animated bars are visible in both themes */
        /* NOTE: We now use explicit Tailwind classes (bg-gray-800 dark:bg-gray-100) on the spans,
           so this custom CSS is no longer strictly needed for visibility, but kept for context. */
        .bg-current {
          background-color: ${theme === 'dark' ? '#D1D5DB' : '#374151'}; 
        }
        
        /* Custom scrollbar styles (from your previous code) */
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