const sourceSystems = require('../../../app/constants/source-systems')

const { getScheme } = require('../../../app/enrichment/get-scheme')

describe('get scheme', () => {
  test.each(
    Object.values(sourceSystems).map((sourceSystem, index) => [sourceSystem, index])
  )('should return scheme for source system', async (sourceSystem, expectedSchemeId) => {
    const result = getScheme(sourceSystem)
    expect(result.schemeId).toBe(expectedSchemeId + 1)
  })

  test('should return undefined if no scheme for source system', async () => {
    const result = getScheme('NOT A THING')
    expect(result).toBeUndefined()
  })

  test('should return undefined if object provided', async () => {
    const result = getScheme({})
    expect(result).toBeUndefined()
  })

  test('should return undefined if array provided', async () => {
    const result = getScheme([])
    expect(result).toBeUndefined()
  })

  test('should return undefined if empty string provided', async () => {
    const result = getScheme('')
    expect(result).toBeUndefined()
  })

  test('should return undefined if false provided', async () => {
    const result = getScheme(false)
    expect(result).toBeUndefined()
  })

  test('should return undefined if true provided', async () => {
    const result = getScheme(true)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 1 provided', async () => {
    const result = getScheme(1)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 0 provided', async () => {
    const result = getScheme(0)
    expect(result).toBeUndefined()
  })
})
