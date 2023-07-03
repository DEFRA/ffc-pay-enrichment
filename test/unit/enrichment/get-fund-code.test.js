const { getFundCode } = require('../../../app/enrichment/get-fund-code')

const defaultFundCode = 'A999'

describe('get fund code', () => {
  test('should return fund code if fund code already exists', async () => {
    const invoiceLine = { fundCode: 'A123' }
    const result = getFundCode(invoiceLine, defaultFundCode)
    expect(result).toBe('A123')
  })

  test('should return default fund code if no existing fund code', async () => {
    const invoiceLine = {}
    const result = getFundCode(invoiceLine, defaultFundCode)
    expect(result).toBe(defaultFundCode)
  })
})
