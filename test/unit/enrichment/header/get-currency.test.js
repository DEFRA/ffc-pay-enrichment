const { GBP } = require('../../../../app/constants/currency')

const { getCurrency } = require('../../../../app/enrichment/header/get-currency')

describe('get currency', () => {
  test('should return existing currency if currency is defined', () => {
    const result = getCurrency(GBP)
    expect(result).toBe(GBP)
  })

  test('should return GBP if currency is undefined', () => {
    const result = getCurrency(undefined)
    expect(result).toBe(GBP)
  })

  test('should return GBP if currency is null', () => {
    const result = getCurrency(null)
    expect(result).toBe(GBP)
  })
})
