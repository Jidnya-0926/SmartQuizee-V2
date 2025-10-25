import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

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

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = parseJwt(token)
    return { token, username: payload?.sub || null, role: payload?.role || null }
  })

  useEffect(() => {
    if (auth) {
      localStorage.setItem('token', auth.token)
      localStorage.setItem('role', auth.role || '')
      localStorage.setItem('username', auth.username || '')
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('username')
    }
  }, [auth])

  const logout = () => setAuth(null)

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
