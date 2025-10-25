import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import AddQuestionForm from './AddQuestionForm'

export default function AdminDashboard() {
  const [questions, setQuestions] = useState([])

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('/admin/all')
      setQuestions(res.data)
    } catch (err) {
      alert('Error fetching questions: ' + (err.response?.data || err.message))
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleDelete = async id => {
    try {
      await axios.delete(`/admin/delete/${id}`)
      fetchQuestions()
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data || err.message))
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <AddQuestionForm onAdded={fetchQuestions} />
      <h3>All Questions</h3>
      <table>
        <thead>
          <tr><th>ID</th><th>Question</th><th>Correct</th><th>Action</th></tr>
        </thead>
        <tbody>
          {questions.map(q => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.question}</td>
              <td>{q.correctAnswer}</td>
              <td><button onClick={() => handleDelete(q.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
