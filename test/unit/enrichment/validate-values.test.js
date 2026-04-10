const { SFI, FPTT } = require('../../../app/constants/schemes')
const { validateValues } = require('../../../app/enrichment/validate-values')

describe('validateValues', () => {
  describe('scheme does not provide accounting values', () => {
    const validCases = [
      [100, [{ value: 100 }]],
      [100, [{ value: 50 }, { value: 50 }]],
      [0, [{ value: 50 }, { value: -50 }]],
      [50, [{ value: 100 }, { value: -50 }]],
      [-100, [{ value: -100 }]],
      [-50, [{ value: -100 }, { value: 50 }]]
    ]

    const invalidCases = [
      [100, [{ value: 50 }]],
      [100, [{ value: 150 }]],
      [100, [{ value: 150 }, { value: -100 }]]
    ]

    test.each(validCases)(
      'does not throw when value %p matches sum of lines %p',
      (value, lines) => {
        expect(() => validateValues(value, lines, SFI)).not.toThrow()
      }
    )

    test.each(invalidCases)(
      'throws when value %p does not match sum of lines %p',
      (value, lines) => {
        expect(() => validateValues(value, lines, SFI)).toThrow()
      }
    )
  })

  describe('scheme provides accounting values', () => {
    const validCases = [
      [-100, [{ value: 100 }]],
      [-100, [{ value: 50 }, { value: 50 }]],
      [0, [{ value: 50 }, { value: -50 }]],
      [-50, [{ value: 100 }, { value: -50 }]],
      [100, [{ value: -100 }]],
      [50, [{ value: -100 }, { value: 50 }]]
    ]

    const invalidCases = [
      [100, [{ value: 100 }]],
      [-100, [{ value: 150 }]],
      [-100, [{ value: 150 }, { value: -100 }]]
    ]

    test.each(validCases)(
      'does not throw when value %p matches sum of lines %p',
      (value, lines) => {
        expect(() => validateValues(value, lines, FPTT)).not.toThrow()
      }
    )

    test.each(invalidCases)(
      'throws when value %p does not match sum of lines %p',
      (value, lines) => {
        expect(() => validateValues(value, lines, FPTT)).toThrow()
      }
    )
  })
})
