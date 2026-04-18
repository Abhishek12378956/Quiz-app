import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Timer from '../components/Timer'
import { useAuth } from '../context/AuthContext'
import { useQuiz } from '../context/QuizContext'
import { useTimer } from '../hooks/useTimer'

export default function QuizPage() {
  const { user } = useAuth()
  const { questions, saveResult } = useQuiz()
  const navigate = useNavigate()

  const [phase, setPhase] = useState('start') // 'start' | 'quiz' | 'done'
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)

  // Use ref so timer expiry callback always has latest answers (fixes stale closure)
  const answersRef = useRef({})

  const handleExpire = useCallback(() => finishQuiz(answersRef.current), [])

  const { timeLeft, formatted, start: startTimer, reset: resetTimer } = useTimer(300, handleExpire)

  const finishQuiz = (finalAnswers) => {
    saveResult({ answers: finalAnswers, questions })
    navigate('/result')
  }

  const startQuiz = () => {
    if (questions.length === 0) {
      alert('No questions available. Please ask the admin to add questions first!')
      return
    }
    answersRef.current = {}
    setCurrent(0)
    setAnswers({})
    setSelected(null)
    resetTimer(300)
    setPhase('quiz')
    startTimer()
  }

  const handleNext = () => {
    const updatedAnswers = { ...answers, [current]: selected }
    answersRef.current = updatedAnswers  // keep ref in sync
    setAnswers(updatedAnswers)

    if (current + 1 >= questions.length) {
      finishQuiz(updatedAnswers)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const progress = Math.round((current / questions.length) * 100)
  const q = questions[current]

  // ─── Start Screen ───────────────────────────────────────────────────────────
  if (phase === 'start') {
    return (
      <div className="min-h-screen bg-[#0f172a]">
        <Navbar variant="user-auth" />
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-6 py-12">
          <div className="card max-w-lg w-full text-center">
            <div className="text-6xl mb-5">🧠</div>
            <h2 className="font-display text-4xl font-bold text-brand mb-3">
              Ready, {user?.name?.split(' ')[0]}?
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-sm mx-auto">
              You have <span className="text-white font-semibold">5 minutes</span> to answer{' '}
              <span className="text-white font-semibold">{questions.length} questions</span>. The quiz
              ends when time runs out or all questions are completed.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Questions', value: questions.length },
                { label: 'Time Limit', value: '5 min' },
                { label: 'Points', value: questions.length },
              ].map((s) => (
                <div key={s.label} className="bg-[#0f172a] rounded-xl py-4 px-3">
                  <div className="text-2xl font-bold text-brand">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={startQuiz}
              className="btn-primary text-base px-10 py-3"
            >
              Start Quiz →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ─── Quiz Screen ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar variant="user-auth" />

      <div className="flex justify-center items-start min-h-[calc(100vh-64px)] px-6 py-10">
        <div className="card max-w-2xl w-full">
          {/* Top bar: progress label + timer */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-400 font-semibold">
              Question{' '}
              <span className="text-brand font-bold text-base">{current + 1}</span>
              <span className="text-slate-600"> / {questions.length}</span>
            </div>
            <Timer timeLeft={timeLeft} formatted={formatted} />
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-[#0f172a] rounded-full mb-7">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Question */}
          <h3 className="text-xl text-slate-100 font-medium leading-relaxed mb-7">
            {q.question}
          </h3>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-8" role="radiogroup">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              return (
                <label
                  key={i}
                  className={`cursor-pointer text-left w-full px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center gap-4
                    ${
                      isSelected
                        ? 'border-brand bg-yellow-950 text-brand'
                        : 'border-slate-700 bg-[#0f172a] text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                >
                  <input
                    type="radio"
                    name={`question-${current}`}
                    value={i}
                    checked={isSelected}
                    onChange={() => setSelected(i)}
                    className="w-4 h-4 accent-brand cursor-pointer shrink-0"
                  />
                  {/* Option letter badge */}
                  <span
                    className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                      ${isSelected ? 'border-brand text-brand' : 'border-slate-700 text-slate-500'}`}
                  >
                    {['A', 'B', 'C', 'D'][i]}
                  </span>
                  <span className="flex-1">{opt}</span>
                </label>
              )
            })}
          </div>

          {/* Bottom bar: dot indicators + Next button */}
          <div className="flex justify-between items-center">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i < current
                      ? 'w-2 h-2 bg-brand'
                      : i === current
                      ? 'w-3 h-2 bg-slate-400'
                      : 'w-2 h-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="btn-primary px-7 py-2.5"
            >
              {current + 1 === questions.length ? 'Finish Quiz ✓' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
