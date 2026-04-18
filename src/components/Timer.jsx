import { getTimerColor } from '../utils/quizHelpers'

export default function Timer({ timeLeft, formatted }) {
  const colorClass = getTimerColor(timeLeft)
  const isUrgent = timeLeft <= 60

  return (
    <div
      className={`font-mono text-xl font-bold px-4 py-2 rounded-lg bg-[#0f172a] border ${
        isUrgent ? 'border-red-800 animate-pulse' : 'border-slate-800'
      } ${colorClass}`}
    >
      ⏱ {formatted}
    </div>
  )
}
