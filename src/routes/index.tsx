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

type Language = 'en' | 'pt'

const translations = {
  en: {
    completed: 'Completed',
    remaining: 'Remaining',
    hours: 'HOURS',
    start: 'START',
    end: 'END',
    complete: 'COMPLETE',
    inClass: 'IN CLASS',
    minutesRemaining: 'min remaining',
    nextClass: 'NEXT CLASS',
    todayAt: 'today at 09:00',
    tomorrowAt: 'tomorrow at 09:00',
    inDays: (days: number) => `in ${days} days`,
    courseComplete: 'COURSE COMPLETE!',
  },
  pt: {
    completed: 'Concluído',
    remaining: 'Restante',
    hours: 'HORAS',
    start: 'INÍCIO',
    end: 'FIM',
    complete: 'COMPLETO',
    inClass: 'EM AULA',
    minutesRemaining: 'min restantes',
    nextClass: 'PRÓXIMA AULA',
    todayAt: 'hoje às 09:00',
    tomorrowAt: 'amanhã às 09:00',
    inDays: (days: number) => `em ${days} dias`,
    courseComplete: 'CURSO CONCLUÍDO!',
  },
}

function LanguageSelector({ language, onChange }: { language: Language; onChange: (lang: Language) => void }) {
  return (
    <div className="flex items-center gap-1 bg-black/30 p-1 geometric-border border-2">
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`px-3 py-1 text-sm font-bold transition-colors ${
          language === 'en'
            ? 'bg-[#FFD700] text-[#004d00]'
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange('pt')}
        className={`px-3 py-1 text-sm font-bold transition-colors ${
          language === 'pt'
            ? 'bg-[#FFD700] text-[#004d00]'
            : 'text-white/70 hover:text-white'
        }`}
      >
        PT
      </button>
    </div>
  )
}

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
  const [language, setLanguage] = useState<Language>('pt')
  const t = translations[language]
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

      {/* Language selector - top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSelector language={language} onChange={setLanguage} />
      </div>

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
                <span className="text-white text-sm">{t.inClass}</span>
                <span className="text-[#FFD700] text-sm">
                  {currentSessionInfo.timeRemainingInClass} {t.minutesRemaining}
                </span>
              </div>
            ) : nextSessionInfo ? (
              <div className="inline-flex items-center gap-2 bg-[#cc0000]/80 px-4 py-2 geometric-border">
                <span className="w-3 h-3 bg-[#FFD700] rounded-full" />
                <span className="text-white text-sm">{t.nextClass}</span>
                <span className="text-[#FFD700] text-sm">
                  {nextSessionInfo.daysUntil === 0
                    ? t.todayAt
                    : nextSessionInfo.daysUntil === 1
                      ? t.tomorrowAt
                      : t.inDays(nextSessionInfo.daysUntil)}
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-[#FFD700] px-4 py-2 geometric-border">
                <span className="text-[#004d00] text-sm font-bold">{t.courseComplete}</span>
              </div>
            )}
          </div>

          {/* Main stats container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Hours Completed */}
            <div className="geometric-border bg-[#004d00]/90 p-8 text-center opacity-0 animate-slide-in delay-2">
              <p className="text-[#FFD700] text-sm tracking-[0.3em] uppercase mb-4">{t.completed}</p>
              <p className="font-display text-7xl text-white">{hoursCompleted}</p>
              <p className="text-white/60 text-sm mt-2">{t.hours}</p>
            </div>

            {/* Hours Remaining */}
            <div className="geometric-border bg-[#cc0000]/90 p-8 text-center opacity-0 animate-slide-in delay-3">
              <p className="text-[#FFD700] text-sm tracking-[0.3em] uppercase mb-4">{t.remaining}</p>
              <p className="font-display text-7xl text-white">{hoursRemaining}</p>
              <p className="text-white/60 text-sm mt-2">{t.hours}</p>
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
              <span>{t.start}</span>
              <span>{Math.round(progressWidth)}% {t.complete}</span>
              <span>{t.end}</span>
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
