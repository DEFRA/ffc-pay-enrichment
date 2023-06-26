const oregonAccountCodes = require('../constants/oregon-account-codes')

const getOregonAccountCode = (accountCode) => {
  return oregonAccountCodes[accountCode]
}

module.exports = {
  getOregonAccountCode
}
