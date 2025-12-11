import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  getTotalHours,
  getElapsedHours,
  getCurrentSession,
  getNextSession,
} from '~/data/scheduleUtils'

export const Route = createFileRoute('/')({
  component: Home,
})

function useAnimatedValue(target: number, duration = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const startTime = performance.now()

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * easeOut))

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    const timeout = setTimeout(() => {
      requestAnimationFrame(update)
    }, 500)

    return () => clearTimeout(timeout)
  }, [target, duration])

  return value
}

function Home() {
  const [elapsed, setElapsed] = useState(getElapsedHours())
  const [currentSessionInfo, setCurrentSessionInfo] = useState(getCurrentSession())
  const [nextSessionInfo, setNextSessionInfo] = useState(getNextSession())
  const totalHours = getTotalHours()

  // Update elapsed hours every second during class time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsedHours())
      setCurrentSessionInfo(getCurrentSession())
      setNextSessionInfo(getNextSession())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const remaining = totalHours - elapsed
  const percentage = (elapsed / totalHours) * 100

  const hoursCompleted = useAnimatedValue(Math.round(elapsed))
  const hoursRemaining = useAnimatedValue(Math.round(remaining))

  const [progressWidth, setProgressWidth] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgressWidth(percentage)
    }, 600)
    return () => clearTimeout(timeout)
  }, [percentage])

  return (
    <div className="min-h-screen overflow-hidden relative bg-[#006600]">
      {/* Background geometric elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 border-[3px] border-[#FFD700]/30 geometric-shape" />
        <div className="absolute top-1/4 right-10 w-40 h-40 bg-[#FFD700]/10 rotate-45" />
        <div className="absolute bottom-20 left-1/4 w-60 h-60 border-2 border-white/10 rounded-full" />
      </div>

      {/* Red diagonal section */}
      <div className="absolute inset-0 bg-[#FF0000] diagonal-split" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12 opacity-0 animate-slide-in">
            <h1 className="font-display text-6xl md:text-8xl text-white tracking-wider">PORTUGUÊS</h1>
            <p className="text-[#FFD700] text-sm tracking-[0.2em] uppercase mt-2">A1 + A2</p>
            <div className="w-32 h-1 bg-[#FFD700] mx-auto mt-4" />
          </div>

          {/* Status indicator */}
          <div className="text-center mb-8 opacity-0 animate-slide-in delay-1">
            {currentSessionInfo.isInClass ? (
              <div className="inline-flex items-center gap-2 bg-[#004d00]/80 px-4 py-2 geometric-border">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white text-sm">EM AULA</span>
                <span className="text-[#FFD700] text-sm">
                  {currentSessionInfo.timeRemainingInClass}min restantes
                </span>
              </div>
            ) : nextSessionInfo ? (
              <div className="inline-flex items-center gap-2 bg-[#cc0000]/80 px-4 py-2 geometric-border">
                <span className="w-3 h-3 bg-[#FFD700] rounded-full" />
                <span className="text-white text-sm">PRÓXIMA AULA</span>
                <span className="text-[#FFD700] text-sm">
                  {nextSessionInfo.daysUntil === 0
                    ? `hoje às 09:00`
                    : nextSessionInfo.daysUntil === 1
                      ? `amanhã às 09:00`
                      : `em ${nextSessionInfo.daysUntil} dias`}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-[#FFD700] px-4 py-2 geometric-border">
                <span className="text-[#004d00] text-sm font-bold">CURSO CONCLUÍDO!</span>
              </div>
            )}
          </div>

          {/* Main stats container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Hours Completed */}
            <div className="geometric-border bg-[#004d00]/90 p-8 text-center opacity-0 animate-slide-in delay-2">
              <p className="text-[#FFD700] text-sm tracking-[0.3em] uppercase mb-4">Completed</p>
              <p className="font-display text-7xl text-white">{hoursCompleted}</p>
              <p className="text-white/60 text-sm mt-2">HOURS</p>
            </div>

            {/* Hours Remaining */}
            <div className="geometric-border bg-[#cc0000]/90 p-8 text-center opacity-0 animate-slide-in delay-3">
              <p className="text-[#FFD700] text-sm tracking-[0.3em] uppercase mb-4">Remaining</p>
              <p className="font-display text-7xl text-white">{hoursRemaining}</p>
              <p className="text-white/60 text-sm mt-2">HOURS</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="opacity-0 animate-slide-in delay-4">
            <div className="h-4 bg-[#004d00] geometric-border border-2">
              <div
                className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] transition-all duration-500"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
            <div className="flex justify-between mt-4 text-white/80 text-sm font-mono">
              <span>START</span>
              <span>{Math.round(progressWidth)}% COMPLETE</span>
              <span>END</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-[#FFD700]" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-[#FFD700]" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-[#FFD700]" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-[#FFD700]" />
    </div>
  )
}
