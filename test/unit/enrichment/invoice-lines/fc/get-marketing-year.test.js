const { _062EWCG } = require('../../../../../app/constants/standard-codes')
const { getMarketingYear } = require('../../../../../app/enrichment/invoice-lines/fc/get-marketing-year')

describe('get FC marketing year', () => {
  test.each([
    [_062EWCG, 2021],
    ['123456', 2015]
  ])('should return %i for standard code %s', (standardCode, expectedYear) => {
    const result = getMarketingYear(standardCode)
    expect(result).toBe(expectedYear)
  })
})
