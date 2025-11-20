const { SOI711, SOI760, SOS210, SOS228 } = require('../../../../../app/constants/account-codes')
const { DEX00, DOM00 } = require('../../../../../app/constants/fund-codes')

const { getFundCode } = require('../../../../../app/enrichment/invoice-lines/imps/get-fund-code')

describe('get IMPS fund code', () => {
  test.each([
    [SOI711, DEX00],
    [SOI760, DEX00],
    [SOS228, DEX00]
  ])('should return %s => %s', (accountCode, expected) => {
    const result = getFundCode(accountCode)
    expect(result).toBe(expected)
  })

  test('should return DOM00 for other account codes', () => {
    const result = getFundCode(SOS210)
    expect(result).toBe(DOM00)
  })
})
