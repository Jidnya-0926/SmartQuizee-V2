import React, { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState(user.photo || "");
  const [attempts, setAttempts] = useState([]);
  const [theme, setTheme] = useState("light");

  // Always filter attempts based on the latest user email
  useEffect(() => {
    const allAttempts = JSON.parse(localStorage.getItem("attempts") || "[]");
    const currentUserEmail = JSON.parse(localStorage.getItem("user")).email;
    const userAttempts = allAttempts.filter((a) => a.userEmail === currentUserEmail);
    setAttempts(userAttempts);
  }, [user]);

  const handleSave = () => {
    const updated = { ...user, name, email, photo };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);

    // Update attempts display after email change
    const allAttempts = JSON.parse(localStorage.getItem("attempts") || "[]");
    const userAttempts = allAttempts.filter((a) => a.userEmail === updated.email);
    setAttempts(userAttempts);

    alert("Profile updated!");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? "#1a0033" : "#e3f2fd";
  const cardBg = isDark ? "#2a004d" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const accentColor = isDark ? "#bb86fc" : "#2196f3";

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: textColor,
        backgroundColor: bgColor,
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Theme Toggle */}
      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <button
          onClick={toggleTheme}
          style={{
            background: accentColor,
            color: isDark ? "#000" : "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 15px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Profile Header */}
      <div
        style={{
          background: isDark
            ? "linear-gradient(90deg, #4b0082, #6a1b9a)"
            : "linear-gradient(90deg, #00bcd4, #2196f3)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          padding: "25px 30px",
          color: "white",
          marginBottom: "25px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {photo && (
            <img
              src={photo}
              alt="Profile"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid white",
                marginRight: "25px",
              }}
            />
          )}
          <div>
            <label
              htmlFor="photoUpload"
              style={{
                display: "inline-block",
                background: "white",
                color: "#2196f3",
                padding: "6px 12px",
                borderRadius: "8px",
                fontWeight: "500",
                cursor: "pointer",
                fontSize: "14px",
                marginTop: "8px",
              }}
            >
              Change Photo
            </label>
            <input
              id="photoUpload"
              type="file"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div style={{ marginLeft: "30px" }}>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>
            Welcome to your profile, {name.toLowerCase()}
          </h2>
          <p style={{ marginTop: "5px", fontSize: "15px" }}>Email: {email}</p>
        </div>
      </div>

      {/* Edit Form */}
      <div
        style={{
          background: cardBg,
          borderRadius: "12px",
          padding: "25px",
        }}
      >
        <h3 style={{ marginTop: 0, textAlign: "center", fontSize: "18px" }}>
          Edit Profile
        </h3>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontWeight: 500 }}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "40%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "15px",
              marginTop: "5px",
              backgroundColor: isDark ? "#333" : "#fff",
              color: textColor,
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", fontWeight: 500 }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "40%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "15px",
              marginTop: "5px",
              backgroundColor: isDark ? "#333" : "#fff",
              color: textColor,
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={handleSave}
            style={{
              width: "50%",
              padding: "10px",
              backgroundColor: accentColor,
              color: isDark ? "#000" : "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            Save
          </button>
        </div>
      </div>

      {/* Attempts Table */}
      <div
        style={{
          background: cardBg,
          borderRadius: "12px",
          padding: "25px",
          marginTop: "25px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            fontSize: "18px",
            marginBottom: "15px",
          }}
        >
          Your Quiz Attempts
        </h3>

        {attempts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>No attempts yet</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: isDark ? "#3a005f" : "#f9f9f9" }}>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Quiz
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Score
                </th>
                <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a, i) => (
                <tr key={i}>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                      textAlign: "center",
                    }}
                  >
                    {a.quizTitle}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                      textAlign: "center",
                    }}
                  >
                    {a.score}/{a.totalQuestions}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                      textAlign: "center",
                    }}
                  >
                    {new Date(a.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
