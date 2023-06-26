const { getESFundCode } = require('./get-es-fund-code')
const { getESMarketingYear } = require('./get-es-marketing-year')
const { getESAccountCode } = require('./get-es-account-code')

const enrichESInvoiceLine = (invoiceLine, marketingYear, scheme) => {
  invoiceLine.fundCode = getESFundCode(invoiceLine.companyCode)
  invoiceLine.marketingYear = getESMarketingYear(invoiceLine.subAccountCode)
  invoiceLine.accountCode = getESAccountCode(invoiceLine.accountCode)
}

module.exports = {
  enrichESInvoiceLine
}
