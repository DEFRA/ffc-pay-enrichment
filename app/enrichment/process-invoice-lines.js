const enrichInvoiceLine = require('./enrich-invoice-line')
const invoiceLine = require('./schemas/invoice-line')
const validateInvoiceLine = require('./validate-invoice-line')

const processInvoiceLines = async (invoiceLines, paymentRequestId, fundCode) => {
  // ignore any net lines
  invoiceLines = invoiceLines.filter(x => !x.description.startsWith('N00'))
  for (const line of invoiceLines) {
    await enrichInvoiceLine(line, fundCode)
    validateInvoiceLine(line)
  }
  return invoiceLines
}

module.exports = processInvoiceLines
