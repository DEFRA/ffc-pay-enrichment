const { EXQ00, DRD05 } = require('../constants/fund-codes')

const getESFundCode = (companyCode) => {
  return companyCode === '31' ? EXQ00 : DRD05
}

module.exports = {
  getESFundCode
}
