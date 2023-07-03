const { ES, IMPS } = require('../../constants/schemes')
const { enrichInvoiceLine: enrichESInvoiceLine } = require('./es')
const { enrichInvoiceLine: enrichIMPSInvoiceLine } = require('./imps')
const { convertToPence } = require('../../currency-convert')
const { getDeliveryBody } = require('./get-delivery-body')
const { getFundCode } = require('./get-fund-code')
const { getMarketingYear } = require('./get-marketing-year')
const { getSchemeCode } = require('./get-scheme-code')
const { isStateAid } = require('./is-state-aid')

const enrichInvoiceLine = (invoiceLine, marketingYear, scheme) => {
  if (scheme?.schemeId === ES) {
    enrichESInvoiceLine(invoiceLine)
  }
  if (scheme?.schemeId === IMPS) {
    enrichIMPSInvoiceLine(invoiceLine)
  }
  invoiceLine.value = convertToPence(invoiceLine.value)
  invoiceLine.schemeCode = getSchemeCode(invoiceLine)
  invoiceLine.fundCode = getFundCode(invoiceLine, scheme?.fundCode)
  invoiceLine.convergence = invoiceLine.convergence ?? false
  invoiceLine.deliveryBody = getDeliveryBody(invoiceLine, scheme?.deliveryBody)
  invoiceLine.marketingYear = getMarketingYear(invoiceLine, marketingYear)
  invoiceLine.stateAid = isStateAid(invoiceLine)
}

module.exports = {
  enrichInvoiceLine
}
