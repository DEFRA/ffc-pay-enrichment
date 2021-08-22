const enrichInvoiceLine = require('./enrich-invoice-line')
const validateInvoiceLine = require('./validate-invoice-line')

const processInvoiceLines = async (invoiceLines, paymentRequestId, fundCode) => {
  for (const invoiceLine of invoiceLines) {
    // ignore any net lines
    if (!invoiceLine.description.startsWith('N00')) {
      await enrichInvoiceLine(invoiceLine, fundCode)
      validateInvoiceLine(invoiceLine)
    }
  }
}

module.exports = processInvoiceLines
