const { convertToDaxDate } = require('../../app/date-convert')

describe('convert currency', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(new Date(2022, 5, 1))
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
    expect(result).toMatch('01/06/2022')
  })
})
