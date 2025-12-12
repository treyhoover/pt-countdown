export type Language = 'en' | 'pt'

export interface TimeInput {
  hour: number
  minute: number
}

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

export function getTimeInWordsCore(language: Language, time: TimeInput): string {
  const { hour, minute } = time

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
  return `${verb} ${hourWord} e ${minuteWord} ${period}.`
}

export function getTimeInWords(language: Language): string {
  const now = new Date()
  const lisbonTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Lisbon' }))
  const hour = lisbonTime.getHours()
  const minute = lisbonTime.getMinutes()

  return getTimeInWordsCore(language, { hour, minute })
}

export function getDurationInWords(language: Language, totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (language === 'en') {
    const hourWord = hours === 1 ? 'hour' : 'hours'
    const minuteWord = minutes === 1 ? 'minute' : 'minutes'

    if (hours === 0) {
      return `${minutes} ${minuteWord}`
    }
    if (minutes === 0) {
      return `${hours} ${hourWord}`
    }
    return `${hours} ${hourWord} and ${minutes} ${minuteWord}`
  }

  // Portuguese
  const hourWord = hours === 1 ? 'hora' : 'horas'
  const minuteWord = minutes === 1 ? 'minuto' : 'minutos'

  if (hours === 0) {
    return `${minutes} ${minuteWord}`
  }
  if (minutes === 0) {
    return `${hours} ${hourWord}`
  }
  return `${hours} ${hourWord} e ${minutes} ${minuteWord}`
}
