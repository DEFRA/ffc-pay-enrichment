const fcAccountCodes = require('../../../constants/fc-account-codes')

const getAccountCode = (standardCode) => {
  return fcAccountCodes[standardCode]
}

module.exports = {
  getAccountCode
}
