const { getAccountCodeFromOregon } = require('./get-account-code-from-oregon')
const { getBalancingSegment } = require('./get-balancing-segment')
const { getESFundCode } = require('./get-es-fund-code')
const { getMarketingYearFromOregon } = require('./get-marketing-year-from-oregon')
const { getOregonAccountCode } = require('./get-oregon-account-code')
const { getOregonMarketingYear } = require('./get-oregon-marketing-year')
const { getOregonSchemeCode } = require('./get-oregon-scheme-code')
const { getSchemeCodeFromOregon } = require('./get-scheme-code-from-oregon')

const enrichESInvoiceLine = (invoiceLine, marketingYear, scheme) => {
  invoiceLine.balancingSegment = getBalancingSegment(invoiceLine.companyCode)
  invoiceLine.oregonAccountCode = getOregonAccountCode(invoiceLine.accountCode)
  invoiceLine.oregonSchemeCode = getOregonSchemeCode(invoiceLine.objectiveCode)
  invoiceLine.oregonMarketingYear = getOregonMarketingYear(invoiceLine.subAccountCode)
  invoiceLine.accountCode = getAccountCodeFromOregon(invoiceLine)
  invoiceLine.fundCode = getESFundCode(invoiceLine)
  invoiceLine.schemeCode = getSchemeCodeFromOregon(invoiceLine.oregonSchemeCode)
  invoiceLine.marketingYear = getMarketingYearFromOregon(invoiceLine.oregonMarketingYear)
}

module.exports = {
  enrichESInvoiceLine
}
