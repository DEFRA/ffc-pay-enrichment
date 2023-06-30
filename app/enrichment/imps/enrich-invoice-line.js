const { getFundCode } = require('./get-fund-code')
const { getAccountCode } = require('./get-account-code')

const enrichInvoiceLine = (invoiceLine) => {
  invoiceLine.fundCode = getFundCode(invoiceLine.companyCode)
  invoiceLine.accountCode = getAccountCode(invoiceLine.accountCode)
}

module.exports = {
  enrichInvoiceLine
}
