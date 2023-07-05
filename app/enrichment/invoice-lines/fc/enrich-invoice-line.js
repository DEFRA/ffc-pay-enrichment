const { getFundCode } = require('./get-fund-code')
const { getMarketingYear } = require('./get-marketing-year')
const { getAccountCode } = require('./get-account-code')
const { getDeliveryBody } = require('../get-delivery-body')

const enrichInvoiceLine = (invoiceLine) => {
  invoiceLine.fundCode = getFundCode(invoiceLine.standardCode)
  invoiceLine.marketingYear = getMarketingYear(invoiceLine.standardCode)
  invoiceLine.accountCode = getAccountCode(invoiceLine.standardCode)
  invoiceLine.deliveryBody = getDeliveryBody(invoiceLine.standardCode)
}

module.exports = {
  enrichInvoiceLine
}
