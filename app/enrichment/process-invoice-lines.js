const { N00 } = require('../constants/line-descriptions')
const { enrichInvoiceLine } = require('./enrich-invoice-line')
const { validateInvoiceLine } = require('./validate-invoice-line')

const processInvoiceLines = (invoiceLines, sourceSystem, marketingYear, scheme) => {
  // ignore any net lines
  invoiceLines = invoiceLines.filter(x => !x.description.startsWith(N00))
  for (const line of invoiceLines) {
    enrichInvoiceLine(line, marketingYear, scheme)
    validateInvoiceLine(line, sourceSystem)
  }
  return invoiceLines
}

module.exports = {
  processInvoiceLines
}
