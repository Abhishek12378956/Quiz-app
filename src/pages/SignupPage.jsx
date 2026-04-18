import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const [globalError, setGlobalError] = useState('')

  const password = watch('password')

  const onSubmit = (data) => {
    setGlobalError('')
    try {
      signup({ name: data.name.trim(), email: data.email.trim(), password: data.password })
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
            <div className="text-5xl mb-3">🚀</div>
            <h2 className="font-display text-3xl font-bold text-brand mb-1">Create Account</h2>
            <p className="text-slate-500 text-sm">Join QuizMaster and test your knowledge</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                placeholder="Jane Smith"
                {...register('name', { 
                  required: 'Full name is required',
                  pattern: { value: /^[a-zA-Z\s]+$/, message: 'Full name can only contain letters and spaces.' }
                })}
                className="form-input"
                autoFocus
              />
              {errors.name && <p className="text-red-400 text-xs mt-1 font-medium">{errors.name.message}</p>}
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="jane@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email address.' }
                })}
                className="form-input"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters.' },
                  validate: {
                    hasLower: v => /(?=.*[a-z])/.test(v) || 'Password must contain at least one lowercase letter.',
                    hasUpper: v => /(?=.*[A-Z])/.test(v) || 'Password must contain at least one uppercase letter.',
                    hasNumber: v => /(?=.*\d)/.test(v) || 'Password must contain at least one number.',
                    hasSpecial: v => /(?=.*[^A-Za-z0-9])/.test(v) || 'Password must contain at least one special character.'
                  }
                })}
                className="form-input"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1 font-medium">{errors.password.message}</p>}
            </div>

            <div>
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat your password"
                {...register('confirm', { 
                  required: 'Please confirm password',
                  validate: value => value === password || 'Passwords do not match.'
                })}
                className="form-input"
              />
              {errors.confirm && <p className="text-red-400 text-xs mt-1 font-medium">{errors.confirm.message}</p>}
            </div>

            {globalError && <div className="alert-error">{globalError}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-base mt-1"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
