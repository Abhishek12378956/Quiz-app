import { useQuiz } from '../context/QuizContext'

export default function QuestionList() {
  const { questions, removeQuestion } = useQuiz()

  if (questions.length === 0) {
    return (
      <div className="card text-center py-16">
        <div className="text-5xl mb-4">📝</div>
        <p className="text-slate-500 text-base">No questions yet.</p>
        <p className="text-slate-600 text-sm mt-1">Add your first question using the form.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {questions.map((q, idx) => (
        <div key={q.id} className="card p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-brand mb-1 uppercase tracking-widest">
                Q{idx + 1}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mb-3">{q.question}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt, oi) => (
                  <span
                    key={oi}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium border ${
                      oi === q.correct
                        ? 'bg-green-950 text-green-400 border-green-800'
                        : 'bg-[#0f172a] text-slate-500 border-slate-800'
                    }`}
                  >
                    {oi === q.correct ? '✓ ' : ''}
                    {opt}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => removeQuestion(q.id)}
              className="btn-danger text-xs px-3 py-1.5 shrink-0"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
