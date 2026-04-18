import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { QuizProvider } from './context/QuizContext'
import ProtectedRoute from './routes/ProtectedRoute'

const HomePage = lazy(() => import('./pages/HomePage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const UserLandingPage = lazy(() => import('./pages/UserLandingPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const QuizPage = lazy(() => import('./pages/QuizPage'))
const ResultPage = lazy(() => import('./pages/ResultPage'))

export default function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Suspense fallback={<div className="h-screen bg-[#0f172a] flex flex-col items-center justify-center gap-4 text-brand font-bold text-xl"><div className="text-4xl animate-bounce">⏳</div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserLandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/result"
              element={
                <ProtectedRoute>
                  <ResultPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </QuizProvider>
    </AuthProvider>
  )
}
