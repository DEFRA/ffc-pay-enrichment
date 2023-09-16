const { N00 } = require('../../constants/line-descriptions')
const { enrichInvoiceLine } = require('./enrich-invoice-line')
const { validateInvoiceLine } = require('../validate-invoice-line')

const enrichInvoiceLines = (invoiceLines, schemeId, marketingYear, scheme) => {
  // ignore any net lines
  invoiceLines = invoiceLines.filter(x => !x.description.startsWith(N00))
  for (const line of invoiceLines) {
    enrichInvoiceLine(line, marketingYear, scheme)
    validateInvoiceLine(line, schemeId)
  }
  return invoiceLines
}

module.exports = {
  enrichInvoiceLines
}
