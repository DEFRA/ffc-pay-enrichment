const db = require('../data')
const cache = require('../cache')

const getScheme = async (sourceSystem) => {
  try {
    const cachedScheme = getSchemeFromCache(sourceSystem)
    if (cachedScheme) {
      return cachedScheme
    }
    const scheme = await getSchemeFromDb(sourceSystem)
    if (scheme) {
      updateCache(sourceSystem, scheme)
    }
    return scheme
  } catch {
    return undefined
  }
}

const getSchemeFromCache = (sourceSystem) => {
  return cache.get(`scheme-${sourceSystem}`)
}

const updateCache = (sourceSystem, value) => {
  return cache.set(`scheme-${sourceSystem}`, value)
}

const getSchemeFromDb = async (sourceSystem) => {
  if (sourceSystem) {
    const scheme = await db.scheme.findOne({ where: { sourceSystem }, raw: true })
    return scheme || undefined
  }
}

module.exports = getScheme
