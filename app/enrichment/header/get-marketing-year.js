const { FC } = require('../../constants/schemes')
const { getMarketingYear: getMarketingYearFromInvoiceLine } = require('../invoice-lines/fc/get-marketing-year')

const getMarketingYear = (paymentRequest) => {
  if (paymentRequest.schemeId === FC) {
    return getMarketingYearFromInvoiceLine(paymentRequest.invoiceLines?.[0]?.standardCode)
  }
  return paymentRequest.marketingYear
}

module.exports = {
  getMarketingYear
}
