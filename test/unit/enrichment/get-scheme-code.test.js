const { SCHEME_CODE } = require('../../mocks/values/scheme-code')

const standardCodes = require('../../../app/constants/standard-codes')
const schemeCodes = require('../../../app/constants/scheme-codes')

const { getSchemeCode } = require('../../../app/enrichment/get-scheme-code')

describe('get scheme code', () => {
  test('should return scheme code if scheme code already exists', async () => {
    const invoiceLine = { schemeCode: SCHEME_CODE }
    const result = getSchemeCode(invoiceLine)
    expect(result).toBe(SCHEME_CODE)
  })

  test.each(
    Object.values(standardCodes).map(standardCode => [standardCode, schemeCodes[standardCode]])
  )('should return scheme code for standard code', async (standardCode, expectedSchemeCode) => {
    const invoiceLine = { standardCode }
    const result = getSchemeCode(invoiceLine)
    expect(result).toBe(expectedSchemeCode)
  })

  test('should return undefined if no schemeCode match', async () => {
    const result = getSchemeCode('NOT A THING')
    expect(result).toBeUndefined()
  })

  test('should return undefined if object provided', async () => {
    const result = getSchemeCode({})
    expect(result).toBeUndefined()
  })

  test('should return undefined if array provided', async () => {
    const result = getSchemeCode([])
    expect(result).toBeUndefined()
  })

  test('should return undefined if empty string provided', async () => {
    const result = getSchemeCode('')
    expect(result).toBeUndefined()
  })

  test('should return undefined if false provided', async () => {
    const result = getSchemeCode(false)
    expect(result).toBeUndefined()
  })

  test('should return undefined if true provided', async () => {
    const result = getSchemeCode(true)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 1 provided', async () => {
    const result = getSchemeCode(1)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 0 provided', async () => {
    const result = getSchemeCode(0)
    expect(result).toBeUndefined()
  })
})
