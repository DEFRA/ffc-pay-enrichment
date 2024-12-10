const sourceSystems = require('../../../app/constants/source-systems')
const schemes = require('../../../app/constants/schemes')
const schemeProperties = require('../../../app/constants/scheme-properties')

const { getScheme } = require('../../../app/enrichment/get-scheme')

describe('get scheme', () => {
  test.each(
    Object.values(sourceSystems).filter(x => x !== sourceSystems.INJECTION).map((sourceSystem, index) => [sourceSystem, index])
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

  test('should return undefined if no scheme for scheme', () => {
    const result = getScheme('NOT A THING')
    expect(result).toBeUndefined()
  })

  test('should return undefined if no scheme for scheme or source system', () => {
    const result = getScheme('NOT A THING', 'NOT A THING')
    expect(result).toBeUndefined()
  })

  test('should replace deliveryBody and fundCode if schemeId is MANUAL and pillar is provided', () => {
    const manualScheme = schemeProperties.find(x => x.schemeId === schemes.MANUAL)
    const pillarScheme = schemeProperties.find(x => x.pillar && x.pillar !== manualScheme.pillar)
    const result = getScheme(schemes.MANUAL, undefined, pillarScheme.pillar)
    expect(result.deliveryBody).toBe(pillarScheme.deliveryBody)
    expect(result.fundCode).toBe(pillarScheme.fundCode)
  })
})
