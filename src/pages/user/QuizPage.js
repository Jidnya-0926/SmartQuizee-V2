import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const allQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
  const allQuestions = JSON.parse(localStorage.getItem("questions") || "[]");

  const quiz = allQuizzes.find(q => q.id === parseInt(quizId));
  const questions = allQuestions
    .filter(q => q.quizId === parseInt(quizId))
    .slice(0, 10);

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [theme, setTheme] = useState(document.documentElement.getAttribute("data-theme") || "light");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const user = JSON.parse(localStorage.getItem("user")); // current logged-in user

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (!quiz) return <p>Quiz not found</p>;

  const handleOptionClick = (qIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) score++;
    });

    const allAttempts = JSON.parse(localStorage.getItem("attempts") || "[]");
    allAttempts.push({
      id: Date.now(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      userEmail: user.email,
      score,
      totalQuestions: questions.length,
      answers,
      date: new Date()
    });
    localStorage.setItem("attempts", JSON.stringify(allAttempts));

    navigate(`/result/${Date.now()}`, {
      state: { score, total: questions.length, answers, quizId: quiz.id }
    });
  };

  const q = questions[currentQuestion];
  const isLast = currentQuestion === questions.length - 1;
  const isDark = theme === "dark";

  return (
    <div className="card" style={{ minHeight: "60vh" }}>
      <h2>{quiz.title}</h2>
      <p>Question {currentQuestion + 1} of {questions.length}</p>

      <div className="card" style={{ margin: "10px 0" }}>
        <p><b>Q{currentQuestion + 1}:</b> {q.question}</p>
        <div className="row" style={{ gap: "10px", flexWrap: "wrap" }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(currentQuestion, i)}
              style={{
                flex: "1 0 45%",
                padding: "10px",
                margin: "4px",
                borderRadius: "8px",
                border: answers[currentQuestion] === i ? `2px solid var(--accent)` : "1px solid #ccc",
                background: answers[currentQuestion] === i ? "var(--accent-hover)" : "var(--card)",
                color: isDark ? "#fff" : "#000",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {!isLast && <button onClick={handleNext} style={{ padding: "8px 16px", minWidth: "120px", marginRight: "10px" }}>Next Question →</button>}
        {isLast && <button onClick={handleSubmit} style={{ padding: "8px 16px", minWidth: "120px" }}>Submit Quiz</button>}
      </div>
    </div>
  );
}
