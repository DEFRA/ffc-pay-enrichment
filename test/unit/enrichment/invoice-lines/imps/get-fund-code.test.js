const { SOI711, SOI760, SOS210, SOS228 } = require('../../../../../app/constants/account-codes')
const { DEX00, DOM00 } = require('../../../../../app/constants/fund-codes')

const { getFundCode } = require('../../../../../app/enrichment/invoice-lines/imps/get-fund-code')

describe('get IMPS fund code', () => {
  test('should return DEX00 if account code is SOI711', () => {
    const result = getFundCode(SOI711)
    expect(result).toBe(DEX00)
  })

  test('should return DEX00 if account code is SOI760', () => {
    const result = getFundCode(SOI760)
    expect(result).toBe(DEX00)
  })

  test('should return DEX00 if account code is SOS228', () => {
    const result = getFundCode(SOS228)
    expect(result).toBe(DEX00)
  })

  test('should return DOM00 if account code is not SOI711, SOI760 or SOS228', () => {
    const result = getFundCode(SOS210)
    expect(result).toBe(DOM00)
  })
})
