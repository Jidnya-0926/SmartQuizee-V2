import React, { useState, useEffect } from "react";

export default function Settings() {
  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Admin password state
  const [adminPassword, setAdminPassword] = useState(
    localStorage.getItem("adminPassword") || "admin123"
  );
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    if (newPassword.length < 4) return alert("Password too short");
    setAdminPassword(newPassword);
    localStorage.setItem("adminPassword", newPassword);
    setNewPassword("");
    alert("Password updated!");
  };

  return (
    <div className="card" style={{ maxWidth: "500px", margin: "20px auto", padding: "20px" }}>
      <h2>Settings</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Theme</h3>
        <button onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
      </div>

      <div>
        <h3>Change Admin Password</h3>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", width: "60%" }}
        />
        <button onClick={changePassword} style={{ padding: "8px 12px" }}>
          Update Password
        </button>
      </div>
    </div>
  );
}
