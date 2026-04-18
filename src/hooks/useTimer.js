import { useState, useEffect, useRef } from 'react'

export function useTimer(initialSeconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) {
      onExpireRef.current?.()
      setRunning(false)
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [running, timeLeft])

  const start = () => setRunning(true)
  const stop = () => setRunning(false)
  const reset = (seconds = initialSeconds) => {
    setRunning(false)
    setTimeLeft(seconds)
  }

  const formatted = `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`

  return { timeLeft, formatted, running, start, stop, reset }
}
