const { convertToDaxDate } = require('../../app/date-convert')

describe('convert date', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2021, 5, 1))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test.each([
    ['01/11/2021', '01/11/2021'], // already DAX
    ['2021-11-01', '01/11/2021'], // Siti Agri format
    ['01-NOV-21', '01/11/2021'], // IMPS format
    ['2021/11/01', '01/11/2021'], // YYYY/MM/DD
    ['01-11-2021', '01/11/2021'] // DD-MM-YYYY
  ])('converts %p to %p', (input, expected) => {
    expect(convertToDaxDate(input)).toBe(expected)
  })

  test.each([
    'Monday 1st November 2021',
    '12/30/2021',
    '12-30-2021',
    '32/11/2021',
    true,
    {},
    [],
    1,
    '/'
  ])('returns undefined for invalid input %p', (input) => {
    expect(convertToDaxDate(input)).toBeUndefined()
  })

  test.each([
    [undefined, true, '01/06/2021'],
    [undefined, false, undefined],
    [undefined, undefined, '01/06/2021'],
    [null, undefined, '01/06/2021'],
    [false, undefined, '01/06/2021'],
    [0, undefined, '01/06/2021'],
    [Boolean(), undefined, '01/06/2021']
  ])('returns correct default for input %p with useDefault %p', (input, useDefault, expected) => {
    expect(convertToDaxDate(input, useDefault)).toBe(expected)
  })
})
