const { EXQ00, DRD05 } = require('../../../../app/constants/fund-codes')
const { getFundCode } = require('../../../../app/enrichment/es/get-fund-code')

describe('get ES fund code', () => {
  test('should return EXQ00 if company code is 31', () => {
    const result = getFundCode('31')
    expect(result).toBe(EXQ00)
  })

  test('should return DRD05 if company code is not 31', () => {
    const result = getFundCode('00')
    expect(result).toBe(DRD05)
  })
})
