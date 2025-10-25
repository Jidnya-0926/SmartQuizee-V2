import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ensureSeedData } from "../../utils/data";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("light"); // track theme
  const navigate = useNavigate();

  useEffect(() => {
    ensureSeedData();
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields required");
    if (password.length < 6) return alert("Password min 6 chars");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase()))
      return alert("User already exists");
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Login now.");
    navigate("/login");
  };

  const inputStyle = {
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  color: theme === "light" ? "#f7eeeeff" : "#080808ff", // only text color changes
  backgroundColor: "#fff", // keep background always white
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontSize: "28px",
          }}
        >
          Signup
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "500", color: "#555" }}>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "500", color: "#555" }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              style={inputStyle}
            />
          </div>
 <label style={{ marginBottom: "5px", fontWeight: "500", color: "#000000ff" }}>Password</label>
          <div style={{ display: "flex", flexDirection: "column" }}>
           
            
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6)"
              type="password"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              background: "#2196f3",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1e88e5")}
            onMouseOut={(e) => (e.target.style.background = "#2196f3")}
          >
            Create account
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2196f3", fontWeight: "500" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
