import React, { useState, useContext } from 'react'
import axios from '../api/axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // register with role USER by default
      await axios.post('/auth/register', null, { params: { username, password, role: 'USER' } })
      // auto-login
      const res = await axios.post('/auth/login', null, { params: { username, password } })
      const token = res.data
      const payload = parseJwt(token)
      setAuth({ token, username: payload?.sub || username, role: payload?.role || 'USER' })
      navigate('/quizzes')
    } catch (err) {
      alert('Signup failed: ' + (err.response?.data || err.message))
    }
  }

  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch {
      return null
    }
  }

  return (
    <div className="auth-form">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}
