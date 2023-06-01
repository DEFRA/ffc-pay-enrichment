const schemeProperties = require('../constants/scheme-properties')

const getScheme = (sourceSystem) => {
  return schemeProperties.find(x => x.sourceSystem === sourceSystem)
}

module.exports = {
  getScheme
}
