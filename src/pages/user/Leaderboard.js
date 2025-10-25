import React, { useState } from "react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const allAttempts = JSON.parse(localStorage.getItem("attempts") || "[]");

    // Calculate total score for each user based on all attempts
    const usersWithTotal = allUsers.map(user => {
      const userAttempts = allAttempts.filter(a => a.userEmail === user.email);
      const totalScore = userAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0);
      return { ...user, totalScore };
    });

    // Sort in descending order of totalScore (high → low)
    usersWithTotal.sort((a, b) => b.totalScore - a.totalScore);

    setUsers(usersWithTotal);
  }, []);

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Leaderboard</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
    </div>
  );
}
