import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [quizzes] = useState(JSON.parse(localStorage.getItem("quizzes") || "[]"));
  const [searchText, setSearchText] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    const mappedQuizzes = quizzes.map(q => {
      const category = categories.find(c => c.id === q.categoryId);
      return { ...q, categoryName: category ? category.name : "—" };
    });

    const filtered = mappedQuizzes.filter(q =>
      q.title.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredQuizzes(filtered);
  }, [searchText, quizzes]);

  const handleStartQuiz = (quiz) => {
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <div className="card">
      <h2>Welcome, {user.name || user.email}!</h2>
      <div style={{ margin: "10px 0" }}>
        <input
          type="text"
          placeholder="Search quizzes..."
          style={{
            width: "20%",
            marginRight: "10px",
            padding: "6px",
            borderRadius: "6px",
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => {}}>Search</button>
      </div>
      <div className="row">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((q) => (
            <div
              key={q.id}
              className="card"
              style={{ flex: "0 0 30%", margin: "10px" }}
            >
              <h3>{q.title}</h3>
              <p>Category: {q.categoryName}</p>
              <p>Total Questions: {q.totalQuestions}</p>
              <p>Time Limit: {q.timeLimit} sec</p>
              <button onClick={() => handleStartQuiz(q)}>Start Quiz</button>
            </div>
          ))
        ) : (
          <p>No quizzes found.</p>
        )}
      </div>
    </div>
  );
}
