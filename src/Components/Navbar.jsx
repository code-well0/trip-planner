import e from "cors";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, searchQuery, setSearchQuery }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* 🌍 Brand */}
      <div className="text-2xl font-bold text-blue-600">
        <Link to="/">YourTripPlanner</Link>
      </div>

      {isLoggedIn && (
        <>
          <NavLink to="/plan">Plan Trip</NavLink>
          <NavLink to="/expenses">Expense Tracker</NavLink>
          <NavLink to="/api/chat">Chatbot</NavLink>

          <input 
            type="text"
            placeholder="Search destination..."
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </>
      )}

    </nav>
  );
};

export default Navbar;
