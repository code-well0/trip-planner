import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function HeroSection({ navigateTo }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleStartPlanningClick = () => {
    navigate(navigateTo || "/login");
  };

  return (
    <div className={`relative h-full w-full bg-cover bg-center flex flex-col items-center justify-center p-8 text-center text-white transition-colors duration-300`}
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1510414842594-ead2100d2047?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-6 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white">
          Plan Your Next Adventure
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover amazing places and create unforgettable memories.
        </p>
        <button
          onClick={handleStartPlanningClick}
          className="px-8 py-4 bg-yellow-500 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
        >
          Start Planning →
        </button>
      </div>
    </div>
  );
}

