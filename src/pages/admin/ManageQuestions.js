import React, { useEffect, useState } from "react";

export default function ManageQuestions() {
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const allQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
    const allQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    setQuestions(allQuestions);
    setQuizzes(allQuizzes);
  }, []);

  const addQuestion = () => {
    if (!selectedQuiz) return alert("Select a quiz first!");
    const q = prompt("Question text:");
    const opt1 = prompt("Option 1:");
    const opt2 = prompt("Option 2:");
    const opt3 = prompt("Option 3:");
    const opt4 = prompt("Option 4:");
    const ans = parseInt(prompt("Correct answer index (0-3):"), 10);
    if (!q || !opt1 || !opt2 || !opt3 || !opt4 || isNaN(ans)) return;

    const newQ = { id: Date.now(), quizId: selectedQuiz.id, question: q, options: [opt1,opt2,opt3,opt4], answer: ans };
    const updated = [...questions, newQ];
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
  };

  const removeQuestion = id => {
    if(!window.confirm("Delete question?")) return;
    const updated = questions.filter(q=>q.id!==id);
    setQuestions(updated);
    localStorage.setItem("questions", JSON.stringify(updated));
  };

  const filtered = questions.filter(q => 
    (!selectedQuiz || q.quizId === selectedQuiz.id) &&
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Manage Questions</h2>
      <div className="row">
        <select onChange={e => setSelectedQuiz(quizzes.find(q => q.id===parseInt(e.target.value)))} value={selectedQuiz?.id || ""}>
          <option value="">Select Quiz</option>
          {quizzes.map(q => <option key={q.id} value={q.id}>{q.title}</option>)}
        </select>
        <input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <button onClick={addQuestion}>Add Question</button>
      </div>
      <table style={{width:"100%", marginTop:12}}>
        <thead><tr><th>Question</th><th>Options</th><th>Answer</th><th>Action</th></tr></thead>
        <tbody>
          {filtered.map(q=>(
            <tr key={q.id}>
              <td>{q.question}</td>
              <td>{q.options.join(", ")}</td>
              <td>{q.options[q.answer]}</td>
              <td><button onClick={()=>removeQuestion(q.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
