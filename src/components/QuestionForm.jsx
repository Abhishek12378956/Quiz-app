import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuiz } from '../context/QuizContext'

const INITIAL_FORM = { question: '', options: ['', '', '', ''], correct: 0 }

export default function QuestionForm() {
  const { questions, addQuestion } = useQuiz()
  const [globalError, setGlobalError] = useState('')
  const [success, setSuccess] = useState('')

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: INITIAL_FORM
  })
  
  const correctVal = watch('correct') // to drive the green checkmark UI

  const onSubmit = (data) => {
    setGlobalError('')
    if (questions.length >= 10) return setGlobalError('Maximum of 10 questions allowed.')
    
    addQuestion({ 
      question: data.question.trim(), 
      options: data.options.map((o) => o.trim()), 
      correct: Number(data.correct) 
    })
    
    reset()
    setSuccess('Question added successfully!')
    setTimeout(() => setSuccess(''), 2500)
  }

  const isFull = questions.length >= 10

  return (
    <div className="card">
      <h2 className="text-lg font-semibold text-slate-200 mb-5">Add New Question</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Question Input */}
        <div className="mb-4">
          <label className="form-label">Question *</label>
          <textarea
            {...register('question', { required: 'Question text is required.' })}
            placeholder="Type your question here..."
            rows={3}
            className="form-input resize-none"
          />
          {errors.question && <p className="text-red-400 text-xs mt-1 font-medium">{errors.question.message}</p>}
        </div>

        {/* Options */}
        <div className="mb-2">
          <label className="form-label">Options * (select correct answer)</label>
          <div className="flex flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value={i}
                    {...register('correct')}
                    className="w-4 h-4 accent-brand cursor-pointer shrink-0"
                  />
                  <input
                    {...register(`options.${i}`, { required: 'Option is required.' })}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    className="form-input flex-1"
                  />
                  {Number(correctVal) === i && (
                    <span className="text-xs text-green-400 font-semibold shrink-0 w-14">✓ Correct</span>
                  )}
                  {Number(correctVal) !== i && <span className="w-14" />}
                </div>
                {errors.options && errors.options[i] && (
                  <p className="text-red-400 text-xs mt-1 pl-7 font-medium">{errors.options[i].message}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-600 mb-5">Click the radio button to mark the correct answer.</p>

        {globalError && <div className="alert-error mb-3">{globalError}</div>}
        {success && <div className="alert-success mb-3">{success}</div>}

        <button
          type="submit"
          disabled={isFull}
          className="btn-primary w-full py-3 text-base"
        >
          {isFull ? '✓ Maximum Questions Reached' : 'Add Question'}
        </button>
      </form>
    </div>
  )
}
