const { convertToPence } = require('../currency-convert')
const { getSchemeCode } = require('./get-scheme-code')

const enrichInvoiceLine = (invoiceLine, marketingYear, scheme) => {
  invoiceLine.value = convertToPence(invoiceLine.value)
  invoiceLine.schemeCode = invoiceLine.schemeCode ?? getSchemeCode(invoiceLine.standardCode)
  invoiceLine.fundCode = invoiceLine.fundCode ?? scheme?.fundCode
  invoiceLine.convergence = invoiceLine.convergence ?? false
  invoiceLine.deliveryBody = invoiceLine.deliveryBody ?? scheme?.deliveryBody
  invoiceLine.marketingYear = invoiceLine.marketingYear ?? marketingYear
  invoiceLine.stateAid = isStateAid(invoiceLine)
}

module.exports = {
  enrichInvoiceLine
}
