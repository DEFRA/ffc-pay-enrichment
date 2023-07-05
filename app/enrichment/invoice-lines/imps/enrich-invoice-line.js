const { getFundCode } = require('./get-fund-code')
const { getAccountCode } = require('./get-account-code')

const enrichInvoiceLine = (invoiceLine) => {
  invoiceLine.accountCode = getAccountCode(invoiceLine.standardCode)
  invoiceLine.fundCode = getFundCode(invoiceLine.accountCode)
}

module.exports = {
  enrichInvoiceLine
}
