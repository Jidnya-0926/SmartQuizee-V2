import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Result() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const data = localStorage.getItem("attempts");
      if (data) {
        const attempts = JSON.parse(data);
        const found = attempts.find(a => String(a.id) === String(attemptId));
        if (found) setAttempt(found);
      }
    } catch (err) {
      console.error("Error loading attempt:", err);
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  if (loading) {
    return <div className="card center">Loading your result...</div>;
  }

  if (!attempt) {
    return (
      <div className="card center">
        <p>No result found for this quiz.</p>
        <button onClick={() => navigate("/dashboard")}>Go Back</button>
      </div>
    );
  }

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const msg = percentage >= 70 ? "🎉 Great job!" : "⚠️ Try again!";

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "30px auto", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px" }}>{attempt.quizTitle || "Quiz"} Completed!</h2>
      
      <div style={{ marginBottom: "20px", fontSize: "1.2rem" }}>
        <p><b>Score:</b> {attempt.score} / {attempt.totalQuestions}</p>
        <p><b>Percentage:</b> {percentage}%</p>
        <p style={{ color: percentage >= 70 ? "green" : "red", fontWeight: "600", fontSize: "1.1rem" }}>{msg}</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "var(--accent)",
            color: "#fff",
            fontWeight: "500",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Back to Dashboard
        </button>

        <button
          onClick={() => navigate(`/review/${attempt.id}`)}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "1px solid var(--accent)",
            background: "transparent",
            color: "var(--text)",
            fontWeight: "500",
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          Review Answers
        </button>
      </div>
    </div>
  );
}
