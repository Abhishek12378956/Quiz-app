import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { loginWithCredentials } = useAuth()
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [globalError, setGlobalError] = useState('')

  const onSubmit = async (data) => {
    setGlobalError('')
    try {
      loginWithCredentials(data.email.trim(), data.password)
      navigate('/quiz')
    } catch (err) {
      setGlobalError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar variant="user-guest" />

      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-6 py-12">
        <div className="card w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">👋</div>
            <h2 className="font-display text-3xl font-bold text-brand mb-1">Welcome Back</h2>
            <p className="text-slate-500 text-sm">Login to continue to your quiz</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })}
                className="form-input"
                autoFocus
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
                className="form-input"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1 font-medium">{errors.password.message}</p>}
            </div>

            {globalError && <div className="alert-error">{globalError}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-base mt-1"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 text-sm mt-6">
            No account yet?{' '}
            <Link to="/signup" className="text-brand font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
