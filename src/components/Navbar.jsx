import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ variant = 'home' }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0a1628] border-b border-slate-800 px-6 h-16 flex items-center justify-between shadow-lg">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 no-underline">
        <span className="text-brand text-xl">⚡</span>
        <span className="font-display text-xl font-bold text-brand tracking-wide">QuizMaster</span>
      </Link>

      {/* Nav Actions */}
      <div className="flex items-center gap-3">
        {variant === 'home' && (
          <>
            <Link to="/user" className="btn-outline text-sm px-5 py-2 no-underline">
              User
            </Link>
            <Link to="/admin" className="btn-primary text-sm px-5 py-2 no-underline">
              Admin
            </Link>
          </>
        )}

        {variant === 'user-guest' && (
          <>
            <Link to="/login" className="btn-outline text-sm px-5 py-2 no-underline">
              Login
            </Link>
            <Link to="/signup" className="btn-primary text-sm px-5 py-2 no-underline">
              Sign Up
            </Link>
          </>
        )}

        {variant === 'user-auth' && (
          <>
            <div className="flex items-center gap-2 text-brand font-semibold text-sm bg-slate-800 px-4 py-2 rounded-lg">
              <span>👤</span>
              <span>{user?.name}</span>
            </div>
            <button onClick={handleLogout} className="btn-danger text-sm">
              Logout
            </button>
          </>
        )}

        {variant === 'admin' && (
          <>
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Admin Panel</span>
            <Link to="/" className="btn-ghost text-sm no-underline">
              ← Home
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
