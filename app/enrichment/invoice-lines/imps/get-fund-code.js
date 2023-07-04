const { SOI711, SOI760, SOS228 } = require('../../../constants/account-codes')
const { DEX00, DOM00 } = require('../../../constants/fund-codes')

const getFundCode = (accountCode) => {
  if ([SOI711, SOI760, SOS228].includes(accountCode)) {
    return DEX00
  }
  return DOM00
}

module.exports = {
  getFundCode
}
