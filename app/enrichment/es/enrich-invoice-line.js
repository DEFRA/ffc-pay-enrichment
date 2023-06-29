const { getFundCode } = require('./get-fund-code')
const { getMarketingYear } = require('./get-marketing-year')
const { getAccountCode } = require('./get-account-code')

const enrichInvoiceLine = (invoiceLine) => {
  invoiceLine.fundCode = getFundCode(invoiceLine.companyCode)
  invoiceLine.marketingYear = getMarketingYear(invoiceLine.subAccountCode)
  invoiceLine.accountCode = getAccountCode(invoiceLine.accountCode)
}

module.exports = {
  enrichInvoiceLine
}
