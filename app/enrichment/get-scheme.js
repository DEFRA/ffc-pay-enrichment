const schemeProperties = require('../constants/scheme-properties')
const {
  MANUAL
} = require('../constants/schemes')

const getScheme = (schemeId, sourceSystem, pillar) => {
  let scheme = schemeId ? schemeProperties.find(x => x.schemeId === schemeId) : schemeProperties.find(x => x.sourceSystem === sourceSystem)

  if (schemeId === MANUAL && pillar) {
    const pillarScheme = schemeProperties.find(x => x.pillar === pillar)
    if (pillarScheme) {
      scheme = { ...scheme, deliveryBody: pillarScheme.deliveryBody, fundCode: pillarScheme.fundCode }
    }
  }

  return scheme
}

module.exports = {
  getScheme
}
