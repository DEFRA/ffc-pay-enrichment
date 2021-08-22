const enrichInvoiceLine = require('./enrich-invoice-line')
const validateInvoiceLine = require('./validate-invoice-line')

const processInvoiceLines = async (invoiceLines, paymentRequestId, fundCode) => {
  // ignore any net lines
  invoiceLines = invoiceLines.filter(x => !x.description.startsWith('N00'))
  for (const invoiceLine of invoiceLines) {
    await enrichInvoiceLine(invoiceLine, fundCode)
    validateInvoiceLine(invoiceLine)
  }
}

module.exports = processInvoiceLines
