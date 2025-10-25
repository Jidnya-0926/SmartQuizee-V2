import  { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ADMIN_CREDENTIALS } from "../../utils/helpers";
import { ensureSeedData } from "../../utils/data";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [theme, setTheme] = useState("light"); // track theme
  const navigate = useNavigate();

  useEffect(() => {
    ensureSeedData();
    // read current theme from document attribute
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");

    // admin check
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLogin({ name: ADMIN_CREDENTIALS.name, email }, "admin");
      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return alert("Invalid credentials. Try demo: demo@user.com / demo123");

    if (remember) {
      localStorage.setItem("user", JSON.stringify(found));
      localStorage.setItem("role", "user");
    }
    onLogin(found, "user");
    navigate("/dashboard");
  };

  // input text color based on theme
  // Inside Login.js
const inputStyle = {
  padding: "12px 15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
  color: theme === "light" ? "#121212ff" : "#f7f5f5ff", // only text color changes
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
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(223, 220, 220, 0.15)",
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
          User Login
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "5px", fontWeight: "500", color: "#555" }}>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              style={inputStyle}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px",
              color: "#555",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ width: "16px", height: "16px" }}
              />
              Remember Me
            </label>
            <Link to="/signup" style={{ color: "#2196f3", textDecoration: "none", fontWeight: "500" }}>
              Signup
            </Link>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
