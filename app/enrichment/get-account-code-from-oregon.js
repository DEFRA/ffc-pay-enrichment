const { SOS228, SOS229, SOS710 } = require('../constants/account-codes')

const getAccountCodeFromOregon = (oregonAccountCode) => {
  if (oregonAccountCode === '0110') {
    return SOS228
  }
  if (oregonAccountCode === '0112') {
    return SOS229
  }
  return SOS710
}

module.exports = {
  getAccountCodeFromOregon
}
