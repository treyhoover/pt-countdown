import { describe, it, expect } from 'vitest'
import { getTimeInWordsCore, type Language, type TimeInput } from './getTimeInWords'

// Helper to make test cases more readable
const time = (hour: number, minute: number): TimeInput => ({ hour, minute })

describe('getTimeInWordsCore', () => {
  describe('English', () => {
    const lang: Language = 'en'

    describe('o\'clock times (minute = 0)', () => {
      it.each([
        [time(0, 0), "It's twelve o'clock in the morning."],
        [time(1, 0), "It's one o'clock in the morning."],
        [time(2, 0), "It's two o'clock in the morning."],
        [time(3, 0), "It's three o'clock in the morning."],
        [time(4, 0), "It's four o'clock in the morning."],
        [time(5, 0), "It's five o'clock in the morning."],
        [time(6, 0), "It's six o'clock in the morning."],
        [time(7, 0), "It's seven o'clock in the morning."],
        [time(8, 0), "It's eight o'clock in the morning."],
        [time(9, 0), "It's nine o'clock in the morning."],
        [time(10, 0), "It's ten o'clock in the morning."],
        [time(11, 0), "It's eleven o'clock in the morning."],
        [time(12, 0), "It's twelve o'clock in the afternoon."],
        [time(13, 0), "It's one o'clock in the afternoon."],
        [time(14, 0), "It's two o'clock in the afternoon."],
        [time(15, 0), "It's three o'clock in the afternoon."],
        [time(16, 0), "It's four o'clock in the afternoon."],
        [time(17, 0), "It's five o'clock in the afternoon."],
        [time(18, 0), "It's six o'clock in the evening."],
        [time(19, 0), "It's seven o'clock in the evening."],
        [time(20, 0), "It's eight o'clock in the evening."],
        [time(21, 0), "It's nine o'clock in the evening."],
        [time(22, 0), "It's ten o'clock in the evening."],
        [time(23, 0), "It's eleven o'clock in the evening."],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('quarter past times (minute = 15)', () => {
      it.each([
        [time(0, 15), "It's quarter past twelve in the morning."],
        [time(3, 15), "It's quarter past three in the morning."],
        [time(9, 15), "It's quarter past nine in the morning."],
        [time(12, 15), "It's quarter past twelve in the afternoon."],
        [time(15, 15), "It's quarter past three in the afternoon."],
        [time(18, 15), "It's quarter past six in the evening."],
        [time(21, 15), "It's quarter past nine in the evening."],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('half past times (minute = 30)', () => {
      it.each([
        [time(0, 30), "It's half past twelve in the morning."],
        [time(3, 30), "It's half past three in the morning."],
        [time(9, 30), "It's half past nine in the morning."],
        [time(12, 30), "It's half past twelve in the afternoon."],
        [time(15, 30), "It's half past three in the afternoon."],
        [time(18, 30), "It's half past six in the evening."],
        [time(21, 30), "It's half past nine in the evening."],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('quarter to times (minute = 45)', () => {
      it.each([
        [time(0, 45), "It's quarter to one in the morning."],
        [time(3, 45), "It's quarter to four in the morning."],
        [time(9, 45), "It's quarter to ten in the morning."],
        [time(11, 45), "It's quarter to twelve in the morning."],
        [time(12, 45), "It's quarter to one in the afternoon."],
        [time(15, 45), "It's quarter to four in the afternoon."],
        [time(17, 45), "It's quarter to six in the afternoon."],
        [time(18, 45), "It's quarter to seven in the evening."],
        [time(21, 45), "It's quarter to ten in the evening."],
        [time(23, 45), "It's quarter to twelve in the evening."],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('oh minutes (1-9)', () => {
      it.each([
        [time(0, 1), "It's twelve oh one in the morning."],
        [time(0, 2), "It's twelve oh two in the morning."],
        [time(0, 3), "It's twelve oh three in the morning."],
        [time(0, 4), "It's twelve oh four in the morning."],
        [time(0, 5), "It's twelve oh five in the morning."],
        [time(0, 6), "It's twelve oh six in the morning."],
        [time(0, 7), "It's twelve oh seven in the morning."],
        [time(0, 8), "It's twelve oh eight in the morning."],
        [time(0, 9), "It's twelve oh nine in the morning."],
        [time(9, 1), "It's nine oh one in the morning."],
        [time(14, 5), "It's two oh five in the afternoon."],
        [time(20, 9), "It's eight oh nine in the evening."],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('regular minutes (10-14, 16-29, 31-44, 46-59)', () => {
      it.each([
        // 10-14
        [time(0, 10), "It's twelve ten in the morning."],
        [time(0, 11), "It's twelve eleven in the morning."],
        [time(0, 12), "It's twelve twelve in the morning."],
        [time(0, 13), "It's twelve thirteen in the morning."],
        [time(0, 14), "It's twelve fourteen in the morning."],
        // 16-19
        [time(0, 16), "It's twelve sixteen in the morning."],
        [time(0, 17), "It's twelve seventeen in the morning."],
        [time(0, 18), "It's twelve eighteen in the morning."],
        [time(0, 19), "It's twelve nineteen in the morning."],
        // 20-29
        [time(9, 20), "It's nine twenty in the morning."],
        [time(9, 21), "It's nine twenty-one in the morning."],
        [time(9, 22), "It's nine twenty-two in the morning."],
        [time(9, 23), "It's nine twenty-three in the morning."],
        [time(9, 24), "It's nine twenty-four in the morning."],
        [time(9, 25), "It's nine twenty-five in the morning."],
        [time(9, 26), "It's nine twenty-six in the morning."],
        [time(9, 27), "It's nine twenty-seven in the morning."],
        [time(9, 28), "It's nine twenty-eight in the morning."],
        [time(9, 29), "It's nine twenty-nine in the morning."],
        // 31-44
        [time(14, 31), "It's two thirty-one in the afternoon."],
        [time(14, 32), "It's two thirty-two in the afternoon."],
        [time(14, 33), "It's two thirty-three in the afternoon."],
        [time(14, 34), "It's two thirty-four in the afternoon."],
        [time(14, 35), "It's two thirty-five in the afternoon."],
        [time(14, 36), "It's two thirty-six in the afternoon."],
        [time(14, 37), "It's two thirty-seven in the afternoon."],
        [time(14, 38), "It's two thirty-eight in the afternoon."],
        [time(14, 39), "It's two thirty-nine in the afternoon."],
        [time(14, 40), "It's two forty in the afternoon."],
        [time(14, 41), "It's two forty-one in the afternoon."],
        [time(14, 42), "It's two forty-two in the afternoon."],
        [time(14, 43), "It's two forty-three in the afternoon."],
        [time(14, 44), "It's two forty-four in the afternoon."],
        // 46-59
        [time(20, 46), "It's eight forty-six in the evening."],
        [time(20, 47), "It's eight forty-seven in the evening."],
        [time(20, 48), "It's eight forty-eight in the evening."],
        [time(20, 49), "It's eight forty-nine in the evening."],
        [time(20, 50), "It's eight fifty in the evening."],
        [time(20, 51), "It's eight fifty-one in the evening."],
        [time(20, 52), "It's eight fifty-two in the evening."],
        [time(20, 53), "It's eight fifty-three in the evening."],
        [time(20, 54), "It's eight fifty-four in the evening."],
        [time(20, 55), "It's eight fifty-five in the evening."],
        [time(20, 56), "It's eight fifty-six in the evening."],
        [time(20, 57), "It's eight fifty-seven in the evening."],
        [time(20, 58), "It's eight fifty-eight in the evening."],
        [time(20, 59), "It's eight fifty-nine in the evening."],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('period transitions', () => {
      it('returns morning for 11:59', () => {
        expect(getTimeInWordsCore(lang, time(11, 59))).toBe(
          "It's eleven fifty-nine in the morning."
        )
      })

      it('returns afternoon for 12:00', () => {
        expect(getTimeInWordsCore(lang, time(12, 0))).toBe(
          "It's twelve o'clock in the afternoon."
        )
      })

      it('returns afternoon for 17:59', () => {
        expect(getTimeInWordsCore(lang, time(17, 59))).toBe(
          "It's five fifty-nine in the afternoon."
        )
      })

      it('returns evening for 18:00', () => {
        expect(getTimeInWordsCore(lang, time(18, 0))).toBe(
          "It's six o'clock in the evening."
        )
      })

      it('returns evening for 23:59', () => {
        expect(getTimeInWordsCore(lang, time(23, 59))).toBe(
          "It's eleven fifty-nine in the evening."
        )
      })
    })
  })

  describe('Portuguese', () => {
    const lang: Language = 'pt'

    describe('midnight and noon special cases', () => {
      it('returns É meia-noite. for 00:00', () => {
        expect(getTimeInWordsCore(lang, time(0, 0))).toBe('É meia-noite.')
      })

      it('returns É meio-dia. for 12:00', () => {
        expect(getTimeInWordsCore(lang, time(12, 0))).toBe('É meio-dia.')
      })

      it('returns É meia-noite e meia. for 00:30', () => {
        expect(getTimeInWordsCore(lang, time(0, 30))).toBe('É meia-noite e meia.')
      })

      it('returns É meio-dia e meia. for 12:30', () => {
        expect(getTimeInWordsCore(lang, time(12, 30))).toBe('É meio-dia e meia.')
      })
    })

    describe('hours with É (singular - 1am, 1pm)', () => {
      it.each([
        [time(1, 0), 'É uma da manhã.'],
        [time(13, 0), 'É uma da tarde.'],
        [time(1, 15), 'É uma e um quarto da manhã.'],
        [time(13, 15), 'É uma e um quarto da tarde.'],
        [time(1, 30), 'É uma e meia da manhã.'],
        [time(13, 30), 'É uma e meia da tarde.'],
        [time(1, 10), 'É uma e dez da manhã.'],
        [time(13, 25), 'É uma e vinte e cinco da tarde.'],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('hours with São (plural)', () => {
      it.each([
        [time(2, 0), 'São duas da manhã.'],
        [time(3, 0), 'São três da manhã.'],
        [time(4, 0), 'São quatro da manhã.'],
        [time(5, 0), 'São cinco da manhã.'],
        [time(6, 0), 'São seis da manhã.'],
        [time(7, 0), 'São sete da manhã.'],
        [time(8, 0), 'São oito da manhã.'],
        [time(9, 0), 'São nove da manhã.'],
        [time(10, 0), 'São dez da manhã.'],
        [time(11, 0), 'São onze da manhã.'],
        [time(14, 0), 'São duas da tarde.'],
        [time(15, 0), 'São três da tarde.'],
        [time(16, 0), 'São quatro da tarde.'],
        [time(17, 0), 'São cinco da tarde.'],
        [time(18, 0), 'São seis da tarde.'],
        [time(19, 0), 'São sete da noite.'],
        [time(20, 0), 'São oito da noite.'],
        [time(21, 0), 'São nove da noite.'],
        [time(22, 0), 'São dez da noite.'],
        [time(23, 0), 'São onze da noite.'],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('quarter past times (minute = 15)', () => {
      it.each([
        [time(0, 15), 'São meia-noite e um quarto da manhã.'],
        [time(2, 15), 'São duas e um quarto da manhã.'],
        [time(9, 15), 'São nove e um quarto da manhã.'],
        [time(12, 15), 'São meio-dia e um quarto da tarde.'],
        [time(15, 15), 'São três e um quarto da tarde.'],
        [time(20, 15), 'São oito e um quarto da noite.'],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('half past times (minute = 30)', () => {
      it.each([
        [time(2, 30), 'São duas e meia da manhã.'],
        [time(9, 30), 'São nove e meia da manhã.'],
        [time(15, 30), 'São três e meia da tarde.'],
        [time(20, 30), 'São oito e meia da noite.'],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('quarter to times (minute = 45)', () => {
      it.each([
        [time(0, 45), 'É uma menos um quarto da manhã.'],
        [time(2, 45), 'São três menos um quarto da manhã.'],
        [time(9, 45), 'São dez menos um quarto da manhã.'],
        [time(11, 45), 'São meio-dia menos um quarto da manhã.'],
        [time(12, 45), 'É uma menos um quarto da tarde.'],
        [time(15, 45), 'São quatro menos um quarto da tarde.'],
        [time(18, 45), 'São sete menos um quarto da tarde.'],
        [time(20, 45), 'São nove menos um quarto da noite.'],
        [time(23, 45), 'São meia-noite menos um quarto da noite.'],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('regular minutes', () => {
      it.each([
        // Single digit minutes
        [time(2, 1), 'São duas e um da manhã.'],
        [time(2, 2), 'São duas e dois da manhã.'],
        [time(2, 3), 'São duas e três da manhã.'],
        [time(2, 4), 'São duas e quatro da manhã.'],
        [time(2, 5), 'São duas e cinco da manhã.'],
        [time(2, 6), 'São duas e seis da manhã.'],
        [time(2, 7), 'São duas e sete da manhã.'],
        [time(2, 8), 'São duas e oito da manhã.'],
        [time(2, 9), 'São duas e nove da manhã.'],
        // Teens
        [time(9, 10), 'São nove e dez da manhã.'],
        [time(9, 11), 'São nove e onze da manhã.'],
        [time(9, 12), 'São nove e doze da manhã.'],
        [time(9, 13), 'São nove e treze da manhã.'],
        [time(9, 14), 'São nove e catorze da manhã.'],
        [time(9, 16), 'São nove e dezasseis da manhã.'],
        [time(9, 17), 'São nove e dezassete da manhã.'],
        [time(9, 18), 'São nove e dezoito da manhã.'],
        [time(9, 19), 'São nove e dezanove da manhã.'],
        // 20s
        [time(14, 20), 'São duas e vinte da tarde.'],
        [time(14, 21), 'São duas e vinte e um da tarde.'],
        [time(14, 22), 'São duas e vinte e dois da tarde.'],
        [time(14, 23), 'São duas e vinte e três da tarde.'],
        [time(14, 24), 'São duas e vinte e quatro da tarde.'],
        [time(14, 25), 'São duas e vinte e cinco da tarde.'],
        [time(14, 26), 'São duas e vinte e seis da tarde.'],
        [time(14, 27), 'São duas e vinte e sete da tarde.'],
        [time(14, 28), 'São duas e vinte e oito da tarde.'],
        [time(14, 29), 'São duas e vinte e nove da tarde.'],
        // 30s
        [time(16, 31), 'São quatro e trinta e um da tarde.'],
        [time(16, 32), 'São quatro e trinta e dois da tarde.'],
        [time(16, 33), 'São quatro e trinta e três da tarde.'],
        [time(16, 34), 'São quatro e trinta e quatro da tarde.'],
        [time(16, 35), 'São quatro e trinta e cinco da tarde.'],
        [time(16, 36), 'São quatro e trinta e seis da tarde.'],
        [time(16, 37), 'São quatro e trinta e sete da tarde.'],
        [time(16, 38), 'São quatro e trinta e oito da tarde.'],
        [time(16, 39), 'São quatro e trinta e nove da tarde.'],
        // 40s
        [time(20, 40), 'São oito e quarenta da noite.'],
        [time(20, 41), 'São oito e quarenta e um da noite.'],
        [time(20, 42), 'São oito e quarenta e dois da noite.'],
        [time(20, 43), 'São oito e quarenta e três da noite.'],
        [time(20, 44), 'São oito e quarenta e quatro da noite.'],
        [time(20, 46), 'São oito e quarenta e seis da noite.'],
        [time(20, 47), 'São oito e quarenta e sete da noite.'],
        [time(20, 48), 'São oito e quarenta e oito da noite.'],
        [time(20, 49), 'São oito e quarenta e nove da noite.'],
        // 50s
        [time(22, 50), 'São dez e cinquenta da noite.'],
        [time(22, 51), 'São dez e cinquenta e um da noite.'],
        [time(22, 52), 'São dez e cinquenta e dois da noite.'],
        [time(22, 53), 'São dez e cinquenta e três da noite.'],
        [time(22, 54), 'São dez e cinquenta e quatro da noite.'],
        [time(22, 55), 'São dez e cinquenta e cinco da noite.'],
        [time(22, 56), 'São dez e cinquenta e seis da noite.'],
        [time(22, 57), 'São dez e cinquenta e sete da noite.'],
        [time(22, 58), 'São dez e cinquenta e oito da noite.'],
        [time(22, 59), 'São dez e cinquenta e nove da noite.'],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('period transitions', () => {
      it('returns da manhã for 11:59', () => {
        expect(getTimeInWordsCore(lang, time(11, 59))).toBe(
          'São onze e cinquenta e nove da manhã.'
        )
      })

      it('returns da tarde for 12:00', () => {
        expect(getTimeInWordsCore(lang, time(12, 0))).toBe('É meio-dia.')
      })

      it('returns da tarde for 18:59', () => {
        expect(getTimeInWordsCore(lang, time(18, 59))).toBe(
          'São seis e cinquenta e nove da tarde.'
        )
      })

      it('returns da noite for 19:00', () => {
        expect(getTimeInWordsCore(lang, time(19, 0))).toBe('São sete da noite.')
      })

      it('returns da noite for 23:59', () => {
        expect(getTimeInWordsCore(lang, time(23, 59))).toBe(
          'São onze e cinquenta e nove da noite.'
        )
      })
    })

    describe('midnight with minutes (non-special cases)', () => {
      it.each([
        [time(0, 1), 'São meia-noite e um da manhã.'],
        [time(0, 15), 'São meia-noite e um quarto da manhã.'],
        [time(0, 45), 'É uma menos um quarto da manhã.'],
        [time(0, 59), 'São meia-noite e cinquenta e nove da manhã.'],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })

    describe('noon with minutes (non-special cases)', () => {
      it.each([
        [time(12, 1), 'São meio-dia e um da tarde.'],
        [time(12, 15), 'São meio-dia e um quarto da tarde.'],
        [time(12, 45), 'É uma menos um quarto da tarde.'],
        [time(12, 59), 'São meio-dia e cinquenta e nove da tarde.'],
      ])('%o returns %s', (input, expected) => {
        expect(getTimeInWordsCore(lang, input)).toBe(expected)
      })
    })
  })

  describe('Edge cases', () => {
    describe('boundary minutes', () => {
      it('handles minute 0 correctly for both languages', () => {
        expect(getTimeInWordsCore('en', time(5, 0))).toBe(
          "It's five o'clock in the morning."
        )
        expect(getTimeInWordsCore('pt', time(5, 0))).toBe('São cinco da manhã.')
      })

      it('handles minute 59 correctly for both languages', () => {
        expect(getTimeInWordsCore('en', time(5, 59))).toBe(
          "It's five fifty-nine in the morning."
        )
        expect(getTimeInWordsCore('pt', time(5, 59))).toBe(
          'São cinco e cinquenta e nove da manhã.'
        )
      })
    })

    describe('hour wrapping', () => {
      it('handles 23:45 quarter to correctly (wraps to hour 0)', () => {
        expect(getTimeInWordsCore('en', time(23, 45))).toBe(
          "It's quarter to twelve in the evening."
        )
        expect(getTimeInWordsCore('pt', time(23, 45))).toBe(
          'São meia-noite menos um quarto da noite.'
        )
      })

      it('handles 11:45 quarter to correctly (wraps to hour 12)', () => {
        expect(getTimeInWordsCore('en', time(11, 45))).toBe(
          "It's quarter to twelve in the morning."
        )
        expect(getTimeInWordsCore('pt', time(11, 45))).toBe(
          'São meio-dia menos um quarto da manhã.'
        )
      })
    })

    describe('all 24 hours at minute 0', () => {
      const hours = Array.from({ length: 24 }, (_, i) => i)

      it.each(hours)('handles hour %d at minute 0 for English', (hour) => {
        const result = getTimeInWordsCore('en', time(hour, 0))
        expect(result).toMatch(/^It's \w+ o'clock in the (morning|afternoon|evening)\.$/);
      })

      it.each(hours)('handles hour %d at minute 0 for Portuguese', (hour) => {
        const result = getTimeInWordsCore('pt', time(hour, 0))
        // Special cases for midnight and noon don't include period
        if (hour === 0) {
          expect(result).toBe('É meia-noite.')
        } else if (hour === 12) {
          expect(result).toBe('É meio-dia.')
        } else {
          expect(result).toMatch(/^(É|São) .+ (da manhã|da tarde|da noite)\.$/);
        }
      })
    })

    describe('all 60 minutes at fixed hour', () => {
      const minutes = Array.from({ length: 60 }, (_, i) => i)

      it.each(minutes)('handles minute %d at hour 10 for English', (minute) => {
        const result = getTimeInWordsCore('en', time(10, minute))
        expect(result).toBeDefined()
        expect(result.length).toBeGreaterThan(0)
        expect(result).toContain("It's")
        expect(result).toContain('in the morning')
      })

      it.each(minutes)('handles minute %d at hour 10 for Portuguese', (minute) => {
        const result = getTimeInWordsCore('pt', time(10, minute))
        expect(result).toBeDefined()
        expect(result.length).toBeGreaterThan(0)
        expect(result).toMatch(/^(É|São)/)
      })
    })
  })

  describe('Exhaustive coverage for every minute of every hour', () => {
    // Generate all 1440 time combinations (24 hours * 60 minutes)
    const allTimes: TimeInput[] = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        allTimes.push({ hour, minute })
      }
    }

    describe('English - all times produce valid output', () => {
      it.each(allTimes)('time %o produces valid English output', (input) => {
        const result = getTimeInWordsCore('en', input)

        // Should be a non-empty string
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)

        // Should start with "It's"
        expect(result).toMatch(/^It's /)

        // Should end with a period
        expect(result).toMatch(/\.$/);

        // Should contain a period designation
        expect(result).toMatch(/in the (morning|afternoon|evening)/)

        // Should not contain undefined or NaN
        expect(result).not.toContain('undefined')
        expect(result).not.toContain('NaN')
      })
    })

    describe('Portuguese - all times produce valid output', () => {
      it.each(allTimes)('time %o produces valid Portuguese output', (input) => {
        const result = getTimeInWordsCore('pt', input)

        // Should be a non-empty string
        expect(typeof result).toBe('string')
        expect(result.length).toBeGreaterThan(0)

        // Should start with É or São
        expect(result).toMatch(/^(É|São) /)

        // Should end with a period
        expect(result).toMatch(/\.$/);

        // Should not contain undefined or NaN
        expect(result).not.toContain('undefined')
        expect(result).not.toContain('NaN')
      })
    })
  })
})
