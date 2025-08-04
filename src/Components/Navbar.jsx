import e from "cors";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, searchQuery, setSearchQuery }) {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>

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
}
