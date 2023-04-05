const enrichHeader = require('./enrich-header')
const validatePaymentRequestType = require('./validate-type')
const validatePaymentRequest = require('./validate-header')
const processInvoiceLines = require('./process-invoice-lines')
const validateValues = require('./validate-values')
const getScheme = require('./get-scheme')

const enrichPaymentRequest = async (paymentRequest) => {
  validatePaymentRequestType(paymentRequest)
  const scheme = await getScheme(paymentRequest.sourceSystem)
  await enrichHeader(paymentRequest, scheme)
  validatePaymentRequest(paymentRequest)
  paymentRequest.invoiceLines = await processInvoiceLines(paymentRequest.invoiceLines, scheme.fundCode, paymentRequest.sourceSystem)
  validateValues(paymentRequest.value, paymentRequest.invoiceLines)
}

module.exports = enrichPaymentRequest
