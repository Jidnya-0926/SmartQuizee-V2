import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ user, role, onLogout, theme, setTheme }) {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  // Check if current page is login/signup/admin-login
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/admin/login";

  return (
    <div className={`navbar ${theme}`}>
      <div className="left">
        <div className="logo">SmartQuiz</div>
      </div>

      {/* Show menu only if NOT on login/signup pages */}
      {!isAuthPage && (
        <div className="nav-actions">
          {role === "user" && (
            <>
              <Link to="/dashboard" className="btn-ghost">Dashboard</Link>
              <Link to="/leaderboard" className="btn-ghost">Leaderboard</Link>
              <Link to="/profile" className="btn-ghost">Profile</Link>
            </>
          )}

          {role === "admin" && (
            <Link to="/admin" className="btn-ghost">Admin</Link>
          )}

          <button className="btn-theme" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {role && <button className="btn-logout" onClick={handleLogout}>Logout</button>}
        </div>
      )}
    </div>
  );
}
