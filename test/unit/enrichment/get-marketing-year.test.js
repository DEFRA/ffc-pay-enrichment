const { getMarketingYear } = require('../../../app/enrichment/get-marketing-year')

describe('get marketing year', () => {
  test('should return undefined marketing year if marketing year is -1', () => {
    const invoiceLine = { marketingYear: -1 }
    const result = getMarketingYear(invoiceLine, 2023)
    expect(result).toBeUndefined()
  })

  test('should return marketing year if marketing year already exists', () => {
    const invoiceLine = { marketingYear: 2020 }
    const result = getMarketingYear(invoiceLine, 2023)
    expect(result).toBe(2020)
  })

  test('should return default marketing year if no existing marketing year', () => {
    const invoiceLine = {}
    const result = getMarketingYear(invoiceLine, 2023)
    expect(result).toBe(2023)
  })
})
