import { NavLink } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>

        {isLoggedIn && (
          <>
            <NavLink to="/plan">Plan Trip</NavLink>
            <NavLink to="/expenses">Expense Tracker</NavLink>
            <NavLink to="/api/chat">Chatbot</NavLink>
          </>
        )}
      </div>

      {!isLoggedIn && (
        <div className="nav-links">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      )}
    </nav>
  );
}