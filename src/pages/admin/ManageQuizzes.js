import { useState, useEffect } from "react";
import { defaultCategories } from "../../utils/data";

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setQuizzes(JSON.parse(localStorage.getItem("quizzes") || "[]"));
    setCategories(JSON.parse(localStorage.getItem("categories") || defaultCategories));
  }, []);

  const addQuiz = () => {
    const title = prompt("Quiz Title:");
    const catId = parseInt(prompt("Category ID:"), 10);
    const totalQuestions = parseInt(prompt("Total Questions:"), 10);
    const timeLimit = parseInt(prompt("Time Limit (seconds):"), 10);
    if (!title || !catId || !totalQuestions || !timeLimit) return;

    const newQuiz = { id: Date.now(), title, categoryId: catId, totalQuestions, timeLimit };
    const updatedQuizzes = [...quizzes, newQuiz];
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));

    // Add placeholder questions
    const existingQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
    const placeholders = Array.from({ length: totalQuestions }, (_, i) => ({
      id: Date.now() + i + 1,
      quizId: newQuiz.id,
      question: `Question ${i + 1} placeholder`,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      answer: 0,
    }));
    localStorage.setItem("questions", JSON.stringify([...existingQuestions, ...placeholders]));
  };

  const editQuiz = (quiz) => {
    const title = prompt("Edit Title:", quiz.title);
    if (!title) return;

    const totalQuestions = parseInt(prompt("Edit Total Questions:", quiz.totalQuestions), 10);
    if (isNaN(totalQuestions) || totalQuestions < 1) return;

    const updatedQuizzes = quizzes.map(q =>
      q.id === quiz.id ? { ...q, title, totalQuestions } : q
    );
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));

    // Update questions
    const existingQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
    const quizQuestions = existingQuestions.filter(q => q.quizId === quiz.id);

    let updatedQuestions;
    if (quizQuestions.length < totalQuestions) {
      // Add placeholders
      const placeholders = Array.from({ length: totalQuestions - quizQuestions.length }, (_, i) => ({
        id: Date.now() + i + 1,
        quizId: quiz.id,
        question: `Question ${quizQuestions.length + i + 1} placeholder`,
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer: 0,
      }));
      updatedQuestions = [...existingQuestions, ...placeholders];
    } else if (quizQuestions.length > totalQuestions) {
      // Remove extra questions
      const toKeepIds = quizQuestions.slice(0, totalQuestions).map(q => q.id);
      updatedQuestions = existingQuestions.filter(q => q.quizId !== quiz.id || toKeepIds.includes(q.id));
    } else {
      updatedQuestions = existingQuestions; // No change
    }

    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const deleteQuiz = (quizId) => {
    if (!window.confirm("Delete quiz?")) return;
    const updatedQuizzes = quizzes.filter(q => q.id !== quizId);
    setQuizzes(updatedQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));

    // Delete questions related to this quiz
    const existingQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
    const updatedQuestions = existingQuestions.filter(q => q.quizId !== quizId);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const filteredQuizzes = quizzes.filter(q => q.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="card">
      <h2>Manage Quizzes</h2>
      <input
        type="text"
        placeholder="Search quizzes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "12px" }}
      />
      <button onClick={addQuiz}>Add Quiz</button>
      <table style={{ width: "100%", marginTop: 12 }}>
        <thead>
          <tr>
            <th>Title</th><th>Category</th><th>Questions</th><th>Time(s)</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuizzes.map(q => (
            <tr key={q.id}>
              <td>{q.title}</td>
              <td>{(categories.find(c => c.id === q.categoryId) || {}).name || "—"}</td>
              <td>{q.totalQuestions}</td>
              <td>{q.timeLimit}</td>
              <td>
                <button onClick={() => editQuiz(q)}>Edit</button>
                <button onClick={() => deleteQuiz(q.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
