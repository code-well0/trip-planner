
import { NavLink } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  const navLinks = [
    { to: "/", label: "Home" },
    ...(isLoggedIn
      ? [
          { to: "/plan", label: "Plan Trip" },
          { to: "/expenses", label: "Expense Tracker" },
          { to: "/api/chat", label: "Chatbot" },
        ]
      : []),
  ];

  return (
    <nav className="navbar" aria-label="Main navigation">
      {navLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? "active" : undefined
          }
          aria-label={label}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
