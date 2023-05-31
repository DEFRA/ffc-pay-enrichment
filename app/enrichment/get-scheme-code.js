const schemeCodes = require('../constants/scheme-codes')

const getSchemeCode = (standardCode) => {
  return schemeCodes[standardCode]
}

module.exports = {
  getSchemeCode
}
