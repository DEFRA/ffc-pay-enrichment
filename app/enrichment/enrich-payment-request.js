const { enrichHeader } = require('./enrich-header')
const { validateType } = require('./validate-type')
const { validateHeader } = require('./validate-header')
const { processInvoiceLines } = require('./process-invoice-lines')
const { validateValues } = require('./validate-values')
const { getScheme } = require('./get-scheme')

const enrichPaymentRequest = async (paymentRequest) => {
  validateType(paymentRequest)
  const scheme = getScheme(paymentRequest.sourceSystem)
  await enrichHeader(paymentRequest, scheme)
  validateHeader(paymentRequest)
  paymentRequest.invoiceLines = await processInvoiceLines(paymentRequest.invoiceLines, paymentRequest.sourceSystem, paymentRequest.marketingYear, scheme)
  validateValues(paymentRequest.value, paymentRequest.invoiceLines)
}

module.exports = {
  enrichPaymentRequest
}
