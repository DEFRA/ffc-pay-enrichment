const schemeCodes = require('../constants/scheme-codes')

const getSchemeCode = (invoiceLine) => {
  return schemeCodes[invoiceLine.standardCode]
}

module.exports = {
  getSchemeCode
}
