const impsAccountCodes = require('../../../constants/imps-account-codes')

const getAccountCode = (standardCode) => {
  return impsAccountCodes[standardCode]
}

module.exports = {
  getAccountCode
}
