const fcFundCodes = require('../../../../../app/constants/fc-fund-codes')

const { getFundCode } = require('../../../../../app/enrichment/invoice-lines/fc/get-fund-code')

describe('get FC fund code', () => {
  test.each(
    Object.values(fcFundCodes).map(standardCode => [standardCode, fcFundCodes[standardCode]])
  )('should return %s account code for standard code', async (standardCode, expectedFundCode) => {
    const result = getFundCode(standardCode)
    expect(result).toBe(expectedFundCode)
  })
})
