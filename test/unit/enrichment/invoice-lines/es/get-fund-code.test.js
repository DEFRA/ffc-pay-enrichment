const { EXQ00, DRD05 } = require('../../../../../app/constants/fund-codes')
const { getFundCode } = require('../../../../../app/enrichment/invoice-lines/es/get-fund-code')

describe('get ES fund code', () => {
  test.each([
    ['31', EXQ00],
    ['00', DRD05],
    ['99', DRD05]
  ])('should return correct fund code for company code %s', (companyCode, expected) => {
    const result = getFundCode(companyCode)
    expect(result).toBe(expected)
  })
})
