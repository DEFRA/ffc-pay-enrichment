const { EXQ00 } = require('../constants/fund-codes')
const fundCodeMap = require('../constants/fund-code-map')

const getESFundCode = (invoiceLine) => {
  if (invoiceLine.balancingSegment === 'EXQ') {
    return EXQ00
  }

  const provisionalFundCode = fundCodeMap[invoiceLine.accountCode]

  return provisionalFundCode.startsWith('EGF') && invoiceLine.oregonSchemeCode.startsWith('4') ? 'EGFXX' : provisionalFundCode
}

module.exports = {
  getESFundCode
}
