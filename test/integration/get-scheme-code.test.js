const db = require('../../app/data')
const getSchemeCode = require('../../app/enrichment/get-scheme-code')
const cache = require('../../app/cache')
let scheme
let schemeCode

describe('get scheme', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    scheme = {
      schemeId: 1,
      name: 'SFI Pilot',
      sourceSystem: 'SFIP'
    }

    schemeCode = {
      schemeCodeId: 1,
      schemeId: 1,
      standardCode: 'SFIP-1',
      schemeCode: '80001'
    }

    await db.scheme.create(scheme)
    await db.schemeCode.create(schemeCode)
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should return schemeCode for standardCode', async () => {
    const result = await getSchemeCode('SFIP-1')
    expect(result).toBe('80001')
  })

  test('should return undefined if no schemeCode match', async () => {
    const result = await getSchemeCode('NOT A THING')
    expect(result).toBeUndefined()
  })

  test('should cache result from database', async () => {
    await getSchemeCode('SFIP-1')
    const result = cache.get('standard-code-SFIP-1')
    expect(result).toBe('80001')
  })

  test('should use cache if available', async () => {
    await getSchemeCode('SFIP-1')
    await db.sequelize.truncate({ cascade: true })
    const result = await getSchemeCode('SFIP-1')
    expect(result).toBe('80001')
  })

  test('should return undefined if object provided', async () => {
    const result = await getSchemeCode({})
    expect(result).toBeUndefined()
  })

  test('should return undefined if array provided', async () => {
    const result = await getSchemeCode([])
    expect(result).toBeUndefined()
  })

  test('should return undefined if empty string provided', async () => {
    const result = await getSchemeCode('')
    expect(result).toBeUndefined()
  })

  test('should return undefined if false provided', async () => {
    const result = await getSchemeCode(false)
    expect(result).toBeUndefined()
  })

  test('should return undefined if true provided', async () => {
    const result = await getSchemeCode(true)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 1 provided', async () => {
    const result = await getSchemeCode(1)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 0 provided', async () => {
    const result = await getSchemeCode(0)
    expect(result).toBeUndefined()
  })
})
