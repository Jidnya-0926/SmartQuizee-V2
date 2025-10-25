import React from "react";
import { useParams } from "react-router-dom";

export default function ReviewAnswers() {
  const { attemptId } = useParams();
  const attempts = JSON.parse(localStorage.getItem("attempts") || "[]");
  const attempt = attempts.find(a => String(a.id) === String(attemptId));
  if (!attempt) return <div className="card">Attempt not found</div>;

  // get questions from localStorage instead of defaultQuestions
  const allQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
  const questions = allQuestions.filter(q => q.quizId === attempt.quizId);

  return (
    <div className="card">
      <h2>Review Answers</h2>
      {questions.map((q, idx) => {
        const selIndex = attempt.answers[idx]; // get selected answer index
        const correctIndex = q.answer;
        return (
          <div
            key={q.id}
            style={{
              marginBottom: 12,
              padding: 10,
              borderRadius: 8,
              background: "var(--glass)"
            }}
          >
            <div><b>Q{idx+1}:</b> {q.question}</div>
            <div style={{ marginTop: 6, color: selIndex === correctIndex ? "green" : "red" }}>
              Your answer: {typeof selIndex !== "undefined" ? q.options[selIndex] : "No answer"}
            </div>
            <div style={{ color: "green" }}>Correct: {q.options[correctIndex]}</div>
          </div>
        );
      })}
    </div>
  );
}
