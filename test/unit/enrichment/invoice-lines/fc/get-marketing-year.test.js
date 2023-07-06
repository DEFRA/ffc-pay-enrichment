const { _062EWCG } = require('../../../../../app/constants/standard-codes')

const { getMarketingYear } = require('../../../../../app/enrichment/invoice-lines/fc/get-marketing-year')

describe('get FC marketing year', () => {
  test('should return 2021 if standard code is 062EWCG', () => {
    const result = getMarketingYear(_062EWCG)
    expect(result).toBe(2021)
  })

  test('should return 2015 if standard code is not 062EWCG', () => {
    const result = getMarketingYear('123456')
    expect(result).toBe(2015)
  })
})
