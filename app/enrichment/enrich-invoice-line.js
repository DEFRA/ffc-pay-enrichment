const { convertToPence } = require('../currency-convert')
const getSchemeCode = require('./get-scheme-code')

const enrichInvoiceLine = async (invoiceLine, fundCode) => {
  invoiceLine.value = convertToPence(invoiceLine.value)
  invoiceLine.schemeCode = invoiceLine.schemeCode ?? await getSchemeCode(invoiceLine.standardCode)
  invoiceLine.fundCode = invoiceLine.fundCode ?? fundCode
  invoiceLine.convergence = invoiceLine.convergence ?? false
}

module.exports = enrichInvoiceLine
