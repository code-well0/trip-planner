import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* 🌍 Brand */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">YourTripPlanner</Link>
      </div>

      {/* 🧭 Navigation Links */}
      <div className="flex space-x-6 items-center text-gray-700 font-medium">
        <SignedIn>
          <Link to="/plan" className="hover:text-blue-600 transition duration-200">
            🧳 Plan Trip
          </Link>
          <Link to="/expenses" className="hover:text-blue-600 transition duration-200">
            💰 Expenses
          </Link>
          <Link to="/api/chat" className="hover:text-blue-600 transition duration-200">
            🤖 AI Assistant
          </Link>
          <Link to="/TripRecommender" className="hover:text-blue-600 transition duration-200">
            ✈️ TripRecommender
          </Link>

          {/* Clerk UserButton + SignOut */}
          <div className="flex items-center space-x-4 ml-4">
            <UserButton afterSignOutUrl="/login" />
            <SignOutButton>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">
                Logout
              </button>
            </SignOutButton>
          </div>
        </SignedIn>

        <SignedOut>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
