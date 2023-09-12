const sourceSystems = require('../../../app/constants/source-systems')
const schemes = require('../../../app/constants/schemes')

const { getScheme } = require('../../../app/enrichment/get-scheme')

describe('get scheme', () => {
  test.each(
    Object.values(sourceSystems).map((sourceSystem, index) => [sourceSystem, index])
  )('should return scheme for source system', (sourceSystem, expectedSchemeId) => {
    const result = getScheme(undefined, sourceSystem)
    expect(result.schemeId).toBe(expectedSchemeId + 1)
  })

  test.each(
    Object.values(schemes).map((schemeId, index) => [schemeId, index])
  )('should return scheme for scheme Id', (schemeId, expectedSchemeId) => {
    const result = getScheme(schemeId)
    expect(result.schemeId).toBe(expectedSchemeId + 1)
  })

  test('should return undefined if no scheme for source system', () => {
    const result = getScheme('NOT A THING')
    expect(result).toBeUndefined()
  })

  test('should return undefined if object provided', () => {
    const result = getScheme({})
    expect(result).toBeUndefined()
  })

  test('should return undefined if array provided', () => {
    const result = getScheme([])
    expect(result).toBeUndefined()
  })

  test('should return undefined if empty string provided', () => {
    const result = getScheme('')
    expect(result).toBeUndefined()
  })

  test('should return undefined if false provided', () => {
    const result = getScheme(false)
    expect(result).toBeUndefined()
  })

  test('should return undefined if true provided', () => {
    const result = getScheme(true)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 0 provided', () => {
    const result = getScheme(0)
    expect(result).toBeUndefined()
  })
})
