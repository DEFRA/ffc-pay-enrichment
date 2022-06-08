const db = require('../../../app/data')
const getScheme = require('../../../app/enrichment/get-scheme')
const cache = require('../../../app/cache')
let scheme

describe('get scheme', () => {
  beforeEach(async () => {
    await cache.flush()
    await db.sequelize.truncate({ cascade: true })

    scheme = {
      schemeId: 1,
      name: 'SFI Pilot',
      sourceSystem: 'SFIP'
    }

    await db.scheme.create(scheme)
  })

  test('should return scheme for source system', async () => {
    const result = await getScheme('SFIP')
    expect(result.schemeId).toBe(1)
    expect(result.name).toBe('SFI Pilot')
  })

  test('should return null if no scheme for source system', async () => {
    const result = await getScheme('NOT A THING')
    expect(result).toBeNull()
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
})
