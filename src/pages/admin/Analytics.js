import React, { useState } from "react";
import { Pie } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Analytics({ theme = "light" }) {
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    const storedAttempts = JSON.parse(localStorage.getItem("attempts") || "[]");

    setUsers(storedUsers);
    setQuizzes(storedQuizzes);
    setAttempts(storedAttempts);
  }, []);

  const totalAttempts = attempts.length;
  const avgScore =
    totalAttempts > 0
      ? (attempts.reduce((sum, a) => sum + (Number(a.score) || 0), 0) / totalAttempts).toFixed(2)
      : 0;

  const quizStats = quizzes.map(q => {
    const quizAttempts = attempts.filter(a => a.quizTitle === q.title);
    const avg =
      quizAttempts.length > 0
        ? (quizAttempts.reduce((sum, a) => sum + (Number(a.score) || 0), 0) / quizAttempts.length).toFixed(1)
        : 0;
    return {
      quiz: q.title || "Untitled Quiz",
      attempts: quizAttempts.length,
      avgScore: Number(avg),
    };
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8854d0", "#eb3b5a"];

  // Theme-aware card style
  const cardStyleTheme = {
    flex: "1",
    minWidth: "200px",
    background: theme === "dark" ? "#2c2c34" : "#f5f5f5",
    color: theme === "dark" ? "#fff" : "#000",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: theme === "dark" 
      ? "0 2px 6px rgba(255,255,255,0.1)" 
      : "0 2px 6px rgba(0,0,0,0.1)",
  };

  // Theme-aware button style
  const buttonStyle = {
    background: theme === "dark" ? "#8854d0" : "#0088FE",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  };

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>📊 Analytics Dashboard</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div style={cardStyleTheme}><b>Total Users:</b> {users.length}</div>
        <div style={cardStyleTheme}><b>Total Quizzes:</b> {quizzes.length}</div>
        <div style={cardStyleTheme}><b>Total Attempts:</b> {totalAttempts}</div>
        <div style={cardStyleTheme}><b>Average Score:</b> {avgScore}</div>
      </div>

      <div style={{ textAlign: "center", marginTop: "25px", minWidth: "200px"}}>
        <button
          onClick={() => navigate("/admin/user-analysis")}
          style={buttonStyle}
        >
          👤 View User-wise Analysis
        </button>
      </div>

      <h3 style={{ marginTop: "30px" }}>📈 Attempts per Quiz</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={quizStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quiz" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="attempts" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "20px" }}>🎯 Average Score per Quiz</h3>
      {/* Wrap in scrollable container for wider chart */}
      <div style={{ width: "100%", overflowX: "auto" }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={quizStats}
              dataKey="avgScore"
              nameKey="quiz"
              outerRadius={110}
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {quizStats.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
