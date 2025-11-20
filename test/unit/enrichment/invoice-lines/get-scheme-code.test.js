const { SCHEME_CODE } = require('../../../mocks/values/scheme-code')
const standardCodes = require('../../../../app/constants/standard-codes')
const schemeCodes = require('../../../../app/constants/scheme-codes')
const { getSchemeCode } = require('../../../../app/enrichment/invoice-lines/get-scheme-code')

describe('get scheme code', () => {
  test('should return scheme code if scheme code already exists', () => {
    const invoiceLine = { schemeCode: SCHEME_CODE }
    expect(getSchemeCode(invoiceLine)).toBe(SCHEME_CODE)
  })

  test.each(
    Object.values(standardCodes).map(standardCode => [standardCode, schemeCodes[standardCode]])
  )('should return scheme code for standard code %s', (standardCode, expectedSchemeCode) => {
    const invoiceLine = { standardCode }
    expect(getSchemeCode(invoiceLine)).toBe(expectedSchemeCode)
  })

  test.each(['NOT A THING', {}, [], '', false, true, 1, 0])(
    'should return undefined for invalid input: %p',
    (input) => {
      expect(getSchemeCode(input)).toBeUndefined()
    }
  )
})
