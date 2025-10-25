import React, { useState } from 'react'
import axios from '../api/axios'

export default function AddQuestionForm({ onAdded }) {
  const [form, setForm] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/admin/add', form)
      setForm({ question:'', optionA:'', optionB:'', optionC:'', optionD:'', correctAnswer:'' })
      onAdded()
    } catch (err) {
      alert('Error adding question: ' + (err.response?.data || err.message))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input name="question" placeholder="Question" value={form.question} onChange={handleChange} required />
      <input name="optionA" placeholder="Option A" value={form.optionA} onChange={handleChange} required />
      <input name="optionB" placeholder="Option B" value={form.optionB} onChange={handleChange} required />
      <input name="optionC" placeholder="Option C" value={form.optionC} onChange={handleChange} required />
      <input name="optionD" placeholder="Option D" value={form.optionD} onChange={handleChange} required />
      <input name="correctAnswer" placeholder="Correct Answer" value={form.correctAnswer} onChange={handleChange} required />
      <button type="submit">Add Question</button>
    </form>
  )
}
