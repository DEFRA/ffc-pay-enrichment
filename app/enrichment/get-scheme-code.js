const db = require('../data')
const cache = require('../cache')

const getSchemeCode = async (standardCode) => {
  try {
    const cachedSchemeCode = getSchemeCodeFromCache(standardCode)
    if (cachedSchemeCode) {
      return cachedSchemeCode
    }
    const schemeCode = await getSchemeCodeFromDb(standardCode)
    if (schemeCode) {
      updateCache(standardCode, schemeCode)
    }
    return schemeCode
  } catch {
    return undefined
  }
}

const getSchemeCodeFromCache = (standardCode) => {
  return cache.get(`standard-code-${standardCode}`)
}

const updateCache = (standardCode, value) => {
  return cache.set(`standard-code-${standardCode}`, value)
}

const getSchemeCodeFromDb = async (standardCode) => {
  if (standardCode) {
    const schemeCode = await db.schemeCode.findOne({ where: { standardCode }, raw: true })
    return schemeCode?.schemeCode
  }
}

module.exports = getSchemeCode
