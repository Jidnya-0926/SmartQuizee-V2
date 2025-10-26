import { useState, useEffect } from "react"; // nes
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function UserAnalysis() {
  const [users, setUsers] = useState([]);
  const [attempts, setAttempts] = useState([]); // fixed

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const storedAttempts = JSON.parse(localStorage.getItem("attempts") || "[]");

    // Calculate total score per user
    const usersWithScores = storedUsers.map(user => {
      const userAttempts = storedAttempts.filter(a => a.userEmail === user.email);
      const totalScore = userAttempts.reduce((sum, a) => sum + (a.score || 0), 0);
      return { ...user, totalScore };
    });

    // Sort by totalScore descending
    usersWithScores.sort((a, b) => b.totalScore - a.totalScore);

    setUsers(usersWithScores);
    setAttempts(storedAttempts);
  }, []);

  // Top 5 performers for chart
  const top5 = users.slice(0, 5);

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>👤 User-wise Analysis</h2>

      {/* Table with all users and scores */}
      <h3>All Users Scores</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>User</th>
            <th style={{ textAlign: "right", padding: "10px" }}>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{u.name}</td>
              <td style={{ padding: "10px", textAlign: "right" }}>{u.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Top 5 Performers Chart */}
      <h3>🏆 Top 5 Performers</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={top5}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalScore" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
