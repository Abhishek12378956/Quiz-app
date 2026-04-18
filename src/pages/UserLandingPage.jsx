import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function UserLandingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // If already logged in, go straight to quiz
  useEffect(() => {
    if (user) navigate('/quiz')
  }, [user, navigate])

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar variant="user-guest" />

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6 text-center">
        <div className="text-7xl mb-6">🎓</div>
        <h1 className="font-display text-4xl font-bold text-brand mb-4">
          Ready to Quiz?
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Login or create an account to start your 5-minute, 10-question challenge and test your knowledge.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link to="/login" className="btn-primary text-base px-9 py-3 no-underline">
            Login
          </Link>
          <Link to="/signup" className="btn-outline text-base px-8 py-3 no-underline">
            Sign Up
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-6 max-w-sm w-full">
          {[
            { icon: '❓', label: '10 Questions' },
            { icon: '⏱️', label: '5 Minutes' },
            { icon: '🏆', label: 'Score & Rank' },
          ].map((item) => (
            <div key={item.label} className="bg-[#1e293b] border border-slate-700 rounded-xl py-5 px-3 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xs text-slate-400 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
