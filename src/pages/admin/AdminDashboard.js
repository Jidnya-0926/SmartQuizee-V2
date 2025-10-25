// src/pages/admin/AdminDashboard.js
import React from "react";
import { FaUsers, FaBookOpen, FaClipboardList } from "react-icons/fa";

export default function AdminDashboard() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  const attempts = JSON.parse(localStorage.getItem("attempts") || "[]");

  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <SummaryCard title="Total Users" count={users.length} color="#2196f3" icon={<FaUsers />} />
        <SummaryCard title="Total Quizzes" count={quizzes.length} color="#ff6b6b" icon={<FaBookOpen />} />
        <SummaryCard title="Total Attempts" count={attempts.length} color="#34ace0" icon={<FaClipboardList />} />
      </div>
    </div>
  );
}

const SummaryCard = ({ title, count, color, icon }) => (
  <div style={{
    flex: "1 1 200px",
    background: "#fff",
    padding: "25px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  }}>
    <div style={{
      fontSize: "32px",
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: `${color}33`
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>{title}</p>
      <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "600", color: "#333" }}>{count}</h2>
    </div>
  </div>
);
