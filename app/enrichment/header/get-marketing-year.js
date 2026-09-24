const { getSchemeIds } = require('ffc-pay-schemes')
const { getMarketingYear: getMarketingYearFromInvoiceLine } = require('../invoice-lines/fc/get-marketing-year')

const { FC } = getSchemeIds()

const getMarketingYear = (paymentRequest) => {
  if (paymentRequest.schemeId === FC) {
    return getMarketingYearFromInvoiceLine(paymentRequest.invoiceLines?.[0]?.standardCode)
  }
  return paymentRequest.marketingYear
}

module.exports = {
  getMarketingYear
}
