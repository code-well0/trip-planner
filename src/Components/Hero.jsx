import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook

export default function HeroSection({ navigateTo }) {
  // Use the custom hook to get the current theme
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleStartPlanningClick = () => {
    navigate(navigateTo || "/login"); // Navigate to the given path or default to home
  };

  return (
    // Add Tailwind dark mode classes to the main container
    <div className="hero-box bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 rounded-lg shadow-xl transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your Next Adventure</h1>
      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">Discover amazing places and create unforgettable memories.</p>
      <button 
        onClick={handleStartPlanningClick}
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition duration-300"
      >
        Start Planning →
      </button>
    </div>
  );
}
