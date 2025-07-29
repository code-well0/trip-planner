import { NavLink } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>

      {isLoggedIn && (
        <>
          <NavLink to="/plan">Plan Trip</NavLink>
          <NavLink to="/expenses">Expense Tracker</NavLink>
          <NavLink to="/api/chat">Chatbot</NavLink>
        </>
      )}
    </nav>
  );
}
