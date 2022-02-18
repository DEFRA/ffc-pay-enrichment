const enrichHeader = require('./enrich-header')
const validatePaymentRequest = require('./validate-header')
const processInvoiceLines = require('./process-invoice-lines')
const validateValues = require('./validate-values')
const getScheme = require('./get-scheme')

const enrichPaymentRequest = async (paymentRequest) => {
  const scheme = await getScheme(paymentRequest.sourceSystem)
  await enrichHeader(paymentRequest, scheme)
  validatePaymentRequest(paymentRequest)
  paymentRequest.invoiceLines = await processInvoiceLines(paymentRequest.invoiceLines, scheme.fundCode)
  validateValues(paymentRequest.value, paymentRequest.invoiceLines)
}

module.exports = enrichPaymentRequest
