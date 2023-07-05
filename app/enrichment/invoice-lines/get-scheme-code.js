const schemeCodes = require('../../constants/scheme-codes')

const getSchemeCode = (invoiceLine) => {
  return invoiceLine.schemeCode ?? schemeCodes[invoiceLine.standardCode]
}

module.exports = {
  getSchemeCode
}
