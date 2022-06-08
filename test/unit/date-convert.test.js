const { convertToDaxDate } = require('../../app/date-convert')

describe('convert date', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2021, 5, 1))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('does not change if already DAX format', () => {
    const result = convertToDaxDate('01/11/2021')
    expect(result).toEqual('01/11/2021')
  })

  test('update Siti Agri to DAX format', () => {
    const result = convertToDaxDate('2021-11-01')
    expect(result).toEqual('01/11/2021')
  })

  test('uses current date in correct format if no date supplied', () => {
    const result = convertToDaxDate()
    expect(result).toMatch('01/06/2021')
  })

  test('converts to correct format if YYYY/MM/DD', () => {
    const result = convertToDaxDate('2021/11/01')
    expect(result).toMatch('01/11/2021')
  })

  test('converts to correct format if DD-MM-YYYY', () => {
    const result = convertToDaxDate('01-11-2021')
    expect(result).toMatch('01/11/2021')
  })

  test('returns undefined if invalid date string', () => {
    const result = convertToDaxDate('Monday 1st November 2021')
    expect(result).toBeUndefined()
  })

  test('returns undefined if MM/DD/YYYY', () => {
    const result = convertToDaxDate('12/30/2021')
    expect(result).toBeUndefined()
  })

  test('returns undefined if MM-DD-YYYY', () => {
    const result = convertToDaxDate('12-30-2021')
    expect(result).toBeUndefined()
  })

  test('returns undefined if invalid date', () => {
    const result = convertToDaxDate('32/11/2021')
    expect(result).toBeUndefined()
  })

  test('uses current date in correct format if undefined', () => {
    const result = convertToDaxDate(undefined)
    expect(result).toMatch('01/06/2021')
  })

  test('uses current date in correct format if null', () => {
    const result = convertToDaxDate(null)
    expect(result).toMatch('01/06/2021')
  })

  test('returns undefined if true', () => {
    const result = convertToDaxDate(true)
    expect(result).toBeUndefined()
  })

  test('returns current date in correct format if false', () => {
    const result = convertToDaxDate(false)
    expect(result).toMatch('01/06/2021')
  })

  test('returns undefined if empty object', () => {
    const result = convertToDaxDate({})
    expect(result).toBeUndefined()
  })

  test('returns undefined if empty array', () => {
    const result = convertToDaxDate([])
    expect(result).toBeUndefined()
  })

  test('returns undefined if 1', () => {
    const result = convertToDaxDate(1)
    expect(result).toBeUndefined()
  })

  test('returns current date in correct format if 0', () => {
    const result = convertToDaxDate(0)
    expect(result).toMatch('01/06/2021')
  })

  test('uses current date in correct format if boolean', () => {
    const result = convertToDaxDate(Boolean())
    expect(result).toMatch('01/06/2021')
  })

  test('returns undefined if only slash', () => {
    const result = convertToDaxDate('/')
    expect(result).toBeUndefined()
  })
})
