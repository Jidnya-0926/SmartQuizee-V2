import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import localQuestions from '../data/questions.json'

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]) // we treat as list of questions
  const [selected, setSelected] = useState(null)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('/quiz/questions')
      if (Array.isArray(res.data) && res.data.length > 0) {
        // backend returns array of Question objects
        const normalized = res.data.map(q => ({
          id: q.id,
          title: q.question || 'Question',
          text: q.question,
          options: [q.optionA, q.optionB, q.optionC, q.optionD],
          correctAnswer: q.correctAnswer
        }))
        setQuizzes([{ id: 1, title: 'Quiz', questions: normalized }])
      } else {
        // fallback to local json
        const fallback = localQuestions.map((q, i) => ({
          id: i + 1,
          title: 'Local Quiz',
          questionText: q.questionText,
          options: [q.optionA, q.optionB, q.optionC, q.optionD],
          correctAnswer: q.correctAnswer
        }))
        setQuizzes([{ id: 1, title: 'Local Quiz', questions: fallback }])
      }
    } catch (err) {
      // fallback
      const fallback = localQuestions.map((q, i) => ({
        id: i + 1,
        title: 'Local Quiz',
        questionText: q.questionText,
        options: [q.optionA, q.optionB, q.optionC, q.optionD],
        correctAnswer: q.correctAnswer
      }))
      setQuizzes([{ id: 1, title: 'Local Quiz', questions: fallback }])
    }
  }

  const startQuiz = q => {
    setSelected(q)
    setIndex(0)
    setScore(0)
    setFinished(false)
  }

  const answer = i => {
    const current = selected.questions[index]
    const chosen = current.options[i]
    if (chosen === current.correctAnswer) setScore(s => s + 1)
    if (index + 1 < selected.questions.length) setIndex(index + 1)
    else setFinished(true)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Quizzes</h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: '30%' }}>
          <ul>
            {quizzes.map(q => (
              <li key={q.id}>
                <button onClick={() => startQuiz(q)}>{q.title}</button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ width: '70%' }}>
          {!selected && <div>Select a quiz to start</div>}
          {selected && !finished && (
            <div>
              <h3>{selected.title}</h3>
              <p>{selected.questions[index].questionText || selected.questions[index].text}</p>
              <ul>
                {selected.questions[index].options.map((opt, idx) => (
                  <li key={idx}>
                    <button onClick={() => answer(idx)}>{opt}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {finished && (
            <div>
              <h3>Finished</h3>
              <p>Score: {score} / {selected.questions.length}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
