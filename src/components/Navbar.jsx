import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext)
  const nav = useNavigate()

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      {auth ? (
        <>
          <span style={{ marginLeft: 12 }}>Hello, {auth.username} ({auth.role})</span>
          <button onClick={handleLogout} style={{ marginLeft: 12 }}>Logout</button>
          {auth.role === 'ADMIN' && <Link to="/admin" style={{ marginLeft: 12 }}>Admin</Link>}
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: 12 }}>Login</Link>
          <Link to="/signup" style={{ marginLeft: 12 }}>Signup</Link>
        </>
      )}
    </nav>
  )
}
