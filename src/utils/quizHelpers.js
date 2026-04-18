export function calcScore(questions, answers) {
  return questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0)
}

export function getFeedback(score, total = 10) {
  const percentage = total > 0 ? (score / total) * 100 : 0;
  if (percentage >= 80) return { emoji: '🎉', label: 'Excellent', color: 'text-brand', bg: 'bg-yellow-950' }
  if (percentage >= 50) return { emoji: '😐', label: 'Good', color: 'text-green-400', bg: 'bg-green-950' }
  return { emoji: '😢', label: 'Better Luck Next Time', color: 'text-slate-400', bg: 'bg-slate-800' }
}

export function getTimerColor(timeLeft) {
  if (timeLeft <= 60) return 'text-red-400'
  if (timeLeft <= 120) return 'text-yellow-400'
  return 'text-green-400'
}
