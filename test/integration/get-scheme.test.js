const db = require('../../app/data')
const getScheme = require('../../app/enrichment/get-scheme')
const cache = require('../../app/cache')
let scheme

describe('get scheme', () => {
  beforeEach(async () => {
    cache.flush()
    await db.sequelize.truncate({ cascade: true })

    scheme = {
      schemeId: 1,
      name: 'SFI Pilot',
      sourceSystem: 'SFIP'
    }

    await db.scheme.create(scheme)
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should return scheme for source system', async () => {
    const result = await getScheme('SFIP')
    expect(result.schemeId).toBe(1)
    expect(result.name).toBe('SFI Pilot')
  })

  test('should return undefined if no scheme for source system', async () => {
    const result = await getScheme('NOT A THING')
    expect(result).toBeUndefined()
  })

  test('should cache result from database', async () => {
    await getScheme('SFIP')
    const result = cache.get('scheme-SFIP')
    expect(result.schemeId).toBe(1)
    expect(result.name).toBe('SFI Pilot')
  })

  test('should use cache if available', async () => {
    await getScheme('SFIP')
    await db.sequelize.truncate({ cascade: true })
    const result = await getScheme('SFIP')
    expect(result.schemeId).toBe(1)
    expect(result.name).toBe('SFI Pilot')
  })

  test('should return undefined if object provided', async () => {
    const result = await getScheme({})
    expect(result).toBeUndefined()
  })

  test('should return undefined if array provided', async () => {
    const result = await getScheme([])
    expect(result).toBeUndefined()
  })

  test('should return undefined if empty string provided', async () => {
    const result = await getScheme('')
    expect(result).toBeUndefined()
  })

  test('should return undefined if false provided', async () => {
    const result = await getScheme(false)
    expect(result).toBeUndefined()
  })

  test('should return undefined if true provided', async () => {
    const result = await getScheme(true)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 1 provided', async () => {
    const result = await getScheme(1)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 0 provided', async () => {
    const result = await getScheme(0)
    expect(result).toBeUndefined()
  })
})
