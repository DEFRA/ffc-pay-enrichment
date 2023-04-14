const enrichInvoiceLine = require('./enrich-invoice-line')
const validateInvoiceLine = require('./validate-invoice-line')

const processInvoiceLines = async (invoiceLines, sourceSystem, scheme) => {
  // ignore any net lines
  invoiceLines = invoiceLines.filter(x => !x.description.startsWith('N00'))
  for (const line of invoiceLines) {
    await enrichInvoiceLine(line, scheme)
    validateInvoiceLine(line, sourceSystem)
  }
  return invoiceLines
}

module.exports = processInvoiceLines
