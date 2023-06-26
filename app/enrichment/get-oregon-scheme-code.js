const oregonSchemeCodes = require('../constants/oregon-scheme-codes')

const getOregonSchemeCode = (objectiveCode) => {
  return oregonSchemeCodes[objectiveCode]
}

module.exports = {
  getOregonSchemeCode
}
