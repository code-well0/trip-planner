import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Welcome to Your Trip Planner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Plan amazing trips, track your expenses, and get AI-powered recommendations 
            for your next adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div onClick={()=> navigate("/plan")} 
          className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Plan Your Trip
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover amazing destinations and create your perfect itinerary.
            </p>
          </div>

          <div onClick={()=> navigate("/expenses")} 
           className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              Track Expenses
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Keep track of your travel budget and expenses in real-time.
            </p>
          </div>

          <div onClick={()=> navigate("/api/chat")} className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
              AI Assistant
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized travel recommendations powered by AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

