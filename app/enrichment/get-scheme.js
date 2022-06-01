const db = require('../data')
const cache = require('../cache')

const getScheme = async (sourceSystem) => {
  const cachedScheme = getSchemeFromCache(sourceSystem)
  if (cachedScheme) {
    return cachedScheme
  }
  const scheme = await getSchemeFromDb(sourceSystem)
  if (scheme) {
    updateCache(sourceSystem, scheme)
  }
  return scheme
}

const getSchemeFromCache = (sourceSystem) => {
  return cache.get(`scheme-${sourceSystem}`)
}

const updateCache = (sourceSystem, value) => {
  return cache.set(`scheme-${sourceSystem}`, value)
}

const getSchemeFromDb = async (sourceSystem) => {
  return db.scheme.findOne({ where: { sourceSystem }, raw: true })
}

module.exports = getScheme
