import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('qz_user')) || null
    } catch {
      return null
    }
  })

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('qz_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('qz_user')
  }

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('qz_users') || '[]')
    const exists = users.find((u) => u.email === userData.email)
    if (exists) throw new Error('Email already registered.')
    const newUser = { name: userData.name, email: userData.email, password: userData.password }
    localStorage.setItem('qz_users', JSON.stringify([...users, newUser]))
    login(newUser)
  }

  const loginWithCredentials = (email, password) => {
    const users = JSON.parse(localStorage.getItem('qz_users') || '[]')
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid email or password.')
    login(user)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loginWithCredentials }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
