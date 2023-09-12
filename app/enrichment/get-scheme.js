const schemeProperties = require('../constants/scheme-properties')

const getScheme = (schemeId, sourceSystem) => {
  return schemeId ? schemeProperties.find(x => x.schemeId === schemeId) : schemeProperties.find(x => x.sourceSystem === sourceSystem)
}

module.exports = {
  getScheme
}
