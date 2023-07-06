const fcAccountCodes = require('../../../../../app/constants/fc-account-codes')

const { getAccountCode } = require('../../../../../app/enrichment/invoice-lines/fc/get-account-code')

describe('get FC account code', () => {
  test.each(
    Object.values(fcAccountCodes).map(standardCode => [standardCode, fcAccountCodes[standardCode]])
  )('should return %s account code for standard code', async (standardCode, expectedAccountCode) => {
    const result = getAccountCode(standardCode)
    expect(result).toBe(expectedAccountCode)
  })
})
