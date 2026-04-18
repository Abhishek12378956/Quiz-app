import { useState } from 'react'
import Navbar from '../components/Navbar'
import QuestionForm from '../components/QuestionForm'
import QuestionList from '../components/QuestionList'
import { useQuiz } from '../context/QuizContext'
import { calcScore } from '../utils/quizHelpers'

function ResultsDashboard({ questions }) {
  const results = (() => {
    try { return JSON.parse(localStorage.getItem('qz_results') || '[]') } catch { return [] }
  })()

  if (results.length === 0) {
    return (
      <div className="card text-center py-10 text-slate-500 text-sm">
        <div className="text-4xl mb-3">📊</div>
        <p>No quiz results yet.</p>
        <p className="text-xs text-slate-600 mt-1">Results will appear here after users complete the quiz.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {results.slice().reverse().map((r, i) => {
        const score = questions.length > 0 ? calcScore(questions, r.answers) : r.score ?? 0
        const total = r.total ?? questions.length
        const pct = total > 0 ? Math.round((score / total) * 100) : 0
        return (
          <div key={i} className="card p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-slate-200 text-sm font-semibold">{r.userName || 'Anonymous'}</p>
              <p className="text-slate-500 text-xs">{new Date(r.timestamp).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-brand font-bold text-lg">{score}/{total}</div>
                <div className="text-xs text-slate-500">{pct}%</div>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                pct >= 80 ? 'bg-yellow-950 text-brand' :
                pct >= 50 ? 'bg-green-950 text-green-400' :
                'bg-red-950 text-red-400'
              }`}>
                {pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪'}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function AdminPage() {
  const { questions } = useQuiz()
  const [activeTab, setActiveTab] = useState('questions')

  const resultsCount = (() => {
    try { return JSON.parse(localStorage.getItem('qz_results') || '[]').length } catch { return 0 }
  })()

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar variant="admin" />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold text-brand">Admin Panel</h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage quiz questions · {questions.length}/10 added
            </p>
          </div>

          <div className="flex gap-4">
            {[
              { label: 'Total Questions', value: questions.length, color: 'text-brand' },
              { label: 'Slots Remaining', value: 10 - questions.length, color: 'text-slate-300' },
              { label: 'Quiz Results', value: resultsCount, color: 'text-green-400' },
            ].map((s) => (
              <div key={s.label} className="bg-[#1e293b] border border-slate-700 rounded-xl px-5 py-3 text-center">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-800 rounded-full mb-8">
          <div
            className="h-full bg-brand rounded-full transition-all duration-500"
            style={{ width: `${(questions.length / 10) * 100}%` }}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-800">
          {[
            { key: 'questions', label: '📝 Questions' },
            { key: 'results', label: `📊 Results (${resultsCount})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'text-brand border-brand bg-yellow-950/30'
                  : 'text-slate-500 border-transparent hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'questions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div><QuestionForm /></div>
            <div>
              <h2 className="text-lg font-semibold text-slate-200 mb-4">Questions ({questions.length}/10)</h2>
              <QuestionList />
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div>
            <h2 className="text-lg font-semibold text-slate-200 mb-4">Quiz Results</h2>
            <ResultsDashboard questions={questions} />
          </div>
        )}
      </div>
    </div>
  )
}
