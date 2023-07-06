const fcFundCodes = require('../../../constants/fc-fund-codes')

const getFundCode = (standardCode) => {
  return fcFundCodes[standardCode]
}

module.exports = {
  getFundCode
}
