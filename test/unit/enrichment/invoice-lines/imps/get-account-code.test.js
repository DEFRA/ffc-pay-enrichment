const impsAccountCodes = require('../../../../../app/constants/imps-account-codes')

const { getAccountCode } = require('../../../../../app/enrichment/invoice-lines/imps/get-account-code')

describe('get IMPS account code', () => {
  test.each(
    Object.values(impsAccountCodes).map(standardCode => [standardCode, impsAccountCodes[standardCode]])
  )('should return %s account code for standard code', async (standardCode, expectedAccountCode) => {
    const result = getAccountCode(standardCode)
    expect(result).toBe(expectedAccountCode)
  })
})
