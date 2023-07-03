const { DEX00, DOM00 } = require('../../../constants/fund-codes')

const getFundCode = (companyCode) => {
  // return companyCode === '31' ? DEX00 : DOM00
  // TODO: seems to be no way to avoid IMPS mapping table with 20k+ rows
}

module.exports = {
  getFundCode
}
