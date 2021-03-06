const { convertToPence } = require('../currency-convert')
const getSchemeCode = require('./get-scheme-code')

const enrichInvoiceLine = async (invoiceLine, fundCode) => {
  invoiceLine.value = convertToPence(invoiceLine.value)
  invoiceLine.schemeCode = invoiceLine.schemeCode ?? await getSchemeCode(invoiceLine.standardCode)
  invoiceLine.fundCode = fundCode
}

module.exports = enrichInvoiceLine
