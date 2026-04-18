import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useQuiz } from '../context/QuizContext'
import { calcScore, getFeedback } from '../utils/quizHelpers'

export default function ResultPage() {
  const { user } = useAuth()
  const { quizResult, questions } = useQuiz()
  const navigate = useNavigate()

  // Guard: if no result, redirect to quiz start
  useEffect(() => {
    if (!quizResult) navigate('/quiz')
  }, [quizResult, navigate])

  if (!quizResult) return null

  const { answers } = quizResult
  const totalQuestions = questions.length
  const score = calcScore(questions, answers)
  const incorrect = totalQuestions - score
  const feedback = getFeedback(score, totalQuestions)

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar variant="user-auth" />

      <div className="flex justify-center items-start min-h-[calc(100vh-64px)] px-6 py-12">
        <div className="card max-w-lg w-full">
          {/* Emoji + heading */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">{feedback.emoji}</div>
            <h2 className={`font-display text-4xl font-bold mb-2 ${feedback.color}`}>
              {feedback.label}
            </h2>
            <p className="text-slate-500 text-sm">
              Great effort, {user?.name?.split(' ')[0]}! Here's how you did.
            </p>
          </div>

          {/* Score stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Score', value: `${score}/${totalQuestions}`, color: 'text-brand' },
              { label: 'Correct', value: score, color: 'text-green-400' },
              { label: 'Incorrect', value: incorrect, color: 'text-red-400' },
            ].map((s) => (
              <div key={s.label} className="bg-[#0f172a] rounded-xl py-5 px-3 text-center border border-slate-800">
                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-slate-500 mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Performance bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Performance</span>
              <span>{Math.round((score / totalQuestions) * 100)}%</span>
            </div>
            <div className="h-2 bg-[#0f172a] rounded-full border border-slate-800">
              <div
                className="h-full bg-brand rounded-full transition-all duration-700"
                style={{ width: `${(score / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Answer Review */}
          <div className="mb-8">
            <h3 className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3">
              Answer Review
            </h3>
            <div className="flex flex-col gap-2">
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correct
                const userAnswer = answers[i] !== undefined ? q.options[answers[i]] : 'Not answered'
                return (
                  <div
                    key={i}
                    className={`rounded-xl px-4 py-3 border text-sm ${
                      isCorrect
                        ? 'bg-green-950 border-green-900'
                        : 'bg-red-950 border-red-900'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 text-xs font-semibold mb-0.5">
                          Q{i + 1}. {q.question.length > 60 ? q.question.slice(0, 60) + '…' : q.question}
                        </p>
                        {!isCorrect && (
                          <p className="text-slate-500 text-xs">
                            Your answer:{' '}
                            <span className="text-red-400">{userAnswer}</span>
                            {' · '}
                            Correct:{' '}
                            <span className="text-green-400">{q.options[q.correct]}</span>
                          </p>
                        )}
                      </div>
                      <span
                        className={`text-xs font-bold shrink-0 ${
                          isCorrect ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {isCorrect ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/quiz')}
              className="btn-primary flex-1 py-3 text-base"
            >
              Try Again
            </button>
            <Link to="/" className="btn-ghost flex-1 py-3 text-base text-center no-underline">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
