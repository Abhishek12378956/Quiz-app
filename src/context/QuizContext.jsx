import { createContext, useContext, useState } from 'react'

const QuizContext = createContext(null)

export function QuizProvider({ children }) {
  const [questions, setQuestions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('qz_questions')) || []
    } catch {
      return []
    }
  })

  const [quizResult, setQuizResult] = useState(null)

  const saveQuestions = (qs) => {
    setQuestions(qs)
    localStorage.setItem('qz_questions', JSON.stringify(qs))
  }

  const addQuestion = (q) => {
    const updated = [...questions, { ...q, id: Date.now() }]
    saveQuestions(updated)
  }

  const removeQuestion = (id) => {
    saveQuestions(questions.filter((q) => q.id !== id))
  }

  // Save result to state AND persist to localStorage for admin dashboard
  const saveResult = (result) => {
    setQuizResult(result)

    const user = (() => {
      try { return JSON.parse(localStorage.getItem('qz_user')) } catch { return null }
    })()

    const entry = {
      userName: user?.name || 'Anonymous',
      answers: result.answers,
      total: result.questions.length,
      timestamp: new Date().toISOString(),
    }

    const existing = (() => {
      try { return JSON.parse(localStorage.getItem('qz_results') || '[]') } catch { return [] }
    })()

    localStorage.setItem('qz_results', JSON.stringify([...existing, entry]))
  }

  return (
    <QuizContext.Provider value={{ questions, addQuestion, removeQuestion, quizResult, saveResult }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  return useContext(QuizContext)
}
