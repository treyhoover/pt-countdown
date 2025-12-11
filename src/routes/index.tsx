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

function getTimeInWords(language: Language): string {
  const now = new Date()
  const lisbonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Lisbon' }))
  const hour = lisbonTime.getHours()
  const minute = lisbonTime.getMinutes()

  const numberWords = {
    en: [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen',
      'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six',
      'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three',
      'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty',
      'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven',
      'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four',
      'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine'
    ],
    pt: [
      'zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
      'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezasseis', 'dezassete', 'dezoito', 'dezanove',
      'vinte', 'vinte e um', 'vinte e dois', 'vinte e três', 'vinte e quatro', 'vinte e cinco',
      'vinte e seis', 'vinte e sete', 'vinte e oito', 'vinte e nove', 'trinta', 'trinta e um',
      'trinta e dois', 'trinta e três', 'trinta e quatro', 'trinta e cinco', 'trinta e seis',
      'trinta e sete', 'trinta e oito', 'trinta e nove', 'quarenta', 'quarenta e um', 'quarenta e dois',
      'quarenta e três', 'quarenta e quatro', 'quarenta e cinco', 'quarenta e seis', 'quarenta e sete',
      'quarenta e oito', 'quarenta e nove', 'cinquenta', 'cinquenta e um', 'cinquenta e dois',
      'cinquenta e três', 'cinquenta e quatro', 'cinquenta e cinco', 'cinquenta e seis',
      'cinquenta e sete', 'cinquenta e oito', 'cinquenta e nove'
    ]
  }

  if (language === 'en') {
    const hourNames = [
      'twelve', 'one', 'two', 'three', 'four', 'five',
      'six', 'seven', 'eight', 'nine', 'ten', 'eleven'
    ]
    const hour12 = hour % 12
    const period = hour < 12 ? 'in the morning' : hour < 18 ? 'in the afternoon' : 'in the evening'
    const hourWord = hourNames[hour12]

    if (minute === 0) {
      return `It's ${hourWord} o'clock ${period}.`
    }
    if (minute === 15) {
      return `It's quarter past ${hourWord} ${period}.`
    }
    if (minute === 30) {
      return `It's half past ${hourWord} ${period}.`
    }
    if (minute === 45) {
      const nextHour = hourNames[(hour12 + 1) % 12]
      return `It's quarter to ${nextHour} ${period}.`
    }
    const minuteWord = numberWords.en[minute]
    if (minute < 10) {
      return `It's ${hourWord} oh ${minuteWord} ${period}.`
    }
    return `It's ${hourWord} ${minuteWord} ${period}.`
  }

  // Portuguese
  const hourNames = [
    'meia-noite', 'uma', 'duas', 'três', 'quatro', 'cinco',
    'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'meio-dia'
  ]

  const getHourWord = (h: number) => {
    if (h === 0) return 'meia-noite'
    if (h === 12) return 'meio-dia'
    return hourNames[h % 12]
  }

  const period = hour < 12 ? 'da manhã' : hour < 19 ? 'da tarde' : 'da noite'
  const hourWord = getHourWord(hour)
  const isOneHour = hour === 1 || hour === 13

  // Handle special cases (midnight, noon)
  if (hour === 0 || hour === 12) {
    if (minute === 0) {
      return hour === 0 ? 'É meia-noite.' : 'É meio-dia.'
    }
    if (minute === 30) {
      return hour === 0 ? 'É meia-noite e meia.' : 'É meio-dia e meia.'
    }
  }

  const verb = isOneHour ? 'É' : 'São'

  if (minute === 0) {
    return `${verb} ${hourWord} ${period}.`
  }
  if (minute === 15) {
    return `${verb} ${hourWord} e um quarto ${period}.`
  }
  if (minute === 30) {
    return `${verb} ${hourWord} e meia ${period}.`
  }
  if (minute === 45) {
    const nextHour = getHourWord((hour + 1) % 24)
    const nextIsOne = (hour + 1) % 12 === 1
    const nextVerb = nextIsOne ? 'É' : 'São'
    return `${nextVerb} ${nextHour} menos um quarto ${period}.`
  }

  // For other minutes
  const minuteWord = numberWords.pt[minute]
  const minutoText = minute === 1 ? 'minuto' : 'minutos'
  return `${verb} ${hourWord} e ${minuteWord} ${minutoText} ${period}.`
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
  const [timeInWords, setTimeInWords] = useState(getTimeInWords(language))
  const totalHours = getTotalHours()

  // Update elapsed hours and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsedHours())
      setCurrentSessionInfo(getCurrentSession())
      setNextSessionInfo(getNextSession())
      setTimeInWords(getTimeInWords(language))
    }, 1000)
    return () => clearInterval(interval)
  }, [language])

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

          {/* Time in words */}
          <div className="text-center mb-6 opacity-0 animate-slide-in delay-1">
            <p className="font-display text-3xl md:text-5xl text-white/90 tracking-wide">
              {timeInWords}
            </p>
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
