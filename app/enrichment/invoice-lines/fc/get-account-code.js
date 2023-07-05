const { SOS228, SOS229, SOS710 } = require('../../../constants/account-codes')

const getAccountCode = (accountCode) => {
  if (['0521', '0532', '0533'].includes(accountCode)) {
    return SOS228
  }
  if (accountCode === '0569') {
    return SOS229
  }
  return SOS710
}

module.exports = {
  getAccountCode
}
