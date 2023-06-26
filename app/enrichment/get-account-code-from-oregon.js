const oregonAccountCodeMap = require('../constants/oregon-account-code-map')

const getAccountCodeFromOregon = (invoiceLine) => {
  return oregonAccountCodeMap.find(x =>
    (x.oregonAccountCode === invoiceLine.oregonAccountCode && x.oregonSchemeCode === invoiceLine.oregonSchemeCode) ||
    (x.oregonAccountCode === invoiceLine.oregonAccountCode)
  )?.accountCode
}

module.exports = {
  getAccountCodeFromOregon
}
