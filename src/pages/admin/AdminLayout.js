import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaUsers, FaBookOpen, FaClipboardList, FaCog, FaChartLine, FaQuestion } from "react-icons/fa";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";
  const sidebarBg = isDark ? "#1e1e2f" : "#ffffff";
  const sidebarColor = isDark ? "#fff" : "#070707ff";
  const mainBg = isDark ? "#121212" : "#f0f2f5";
  const mainText = isDark ? "#fff" : "#000000ff";
  const buttonBg = isDark ? "#2a2a40" : "#667ef5ff";
  const buttonHover = isDark ? "#0b798aff" : "#081b76ff";

  return (
    <div style={{ display: "flex", minHeight: "90vh", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: mainBg }}>
      
      {/* Sidebar */}
      <div style={{
        width: "250px",
        height: "550px",
        backgroundColor: sidebarBg,
        color: sidebarColor,
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        borderRadius: "12px 0 0 12px",
        boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
        position: "fixed"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px", fontSize: "24px" }}>Admin Panel</h2>
        <SidebarButton icon={<FaBookOpen />} text="Manage Quizzes" onClick={() => navigate("/admin/manage-quizzes")} buttonBg={buttonBg} buttonHover={buttonHover} />
        <SidebarButton icon={<FaQuestion />} text="Manage Questions" onClick={() => navigate("/admin/manage-questions")} buttonBg={buttonBg} buttonHover={buttonHover} />
        <SidebarButton icon={<FaClipboardList />} text="Manage Categories" onClick={() => navigate("/admin/manage-categories")} buttonBg={buttonBg} buttonHover={buttonHover} />
        <SidebarButton icon={<FaUsers />} text="User Management" onClick={() => navigate("/admin/users")} buttonBg={buttonBg} buttonHover={buttonHover} />
        <SidebarButton icon={<FaChartLine />} text="Analytics" onClick={() => navigate("/admin/analytics")} buttonBg={buttonBg} buttonHover={buttonHover} />
        <SidebarButton icon={<FaCog />} text="Settings" onClick={() => navigate("/admin/settings")} buttonBg={buttonBg} buttonHover={buttonHover} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, marginLeft: "270px", padding: "40px", display: "flex", flexDirection: "column", gap: "30px", color: mainText }}>
        <Outlet />
      </div>
    </div>
  );
}

// Sidebar Button
const SidebarButton = ({ icon, text, onClick, buttonBg, buttonHover }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px",
      padding: "12px 15px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: buttonBg,
      color: "#fff",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "0.3s"
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHover)}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonBg)}
  >
    {icon} {text}
  </button>
);
