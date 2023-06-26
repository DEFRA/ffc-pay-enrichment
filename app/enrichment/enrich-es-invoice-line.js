const { getAccountCodeFromOregon } = require('./get-account-code-from-oregon')
const { getESFundCode } = require('./get-es-fund-code')
const { getESMarketingYear } = require('./get-es-marketing-year')
const { getOregonAccountCode } = require('./get-oregon-account-code')

const enrichESInvoiceLine = (invoiceLine, marketingYear, scheme) => {
  invoiceLine.fundCode = getESFundCode(invoiceLine.companyCode)
  invoiceLine.marketingYear = getESMarketingYear(invoiceLine.subAccountCode)
  invoiceLine.oregonAccountCode = getOregonAccountCode(invoiceLine.accountCode)
  invoiceLine.accountCode = getAccountCodeFromOregon(invoiceLine.oregonAccountCode)
}

module.exports = {
  enrichESInvoiceLine
}
