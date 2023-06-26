const { getAccountCodeFromOregon } = require('./get-account-code-from-oregon')
const { getESFundCode } = require('./get-es-fund-code')
const { getESMarketingYear } = require('./get-es-marketing-year')
const { getOregonAccountCode } = require('./get-oregon-account-code')
const { getOregonSchemeCode } = require('./get-oregon-scheme-code')
const { getSchemeCodeFromOregon } = require('./get-scheme-code-from-oregon')

const enrichESInvoiceLine = (invoiceLine, marketingYear, scheme) => {
  invoiceLine.fundCode = getESFundCode(invoiceLine.companyCode)
  invoiceLine.marketingYear = getESMarketingYear(invoiceLine.subAccountCode)
  invoiceLine.oregonSchemeCode = getOregonSchemeCode(invoiceLine.objectiveCode)
  invoiceLine.schemeCode = getSchemeCodeFromOregon(invoiceLine.oregonSchemeCode)
  invoiceLine.oregonAccountCode = getOregonAccountCode(invoiceLine.accountCode)
  invoiceLine.accountCode = getAccountCodeFromOregon(invoiceLine.oregonAccountCode)
}

module.exports = {
  enrichESInvoiceLine
}
