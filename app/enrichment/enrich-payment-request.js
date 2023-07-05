const { enrichHeader } = require('./header')
const { validateType } = require('./validate-type')
const { validateHeader } = require('./validate-header')
const { enrichInvoiceLines } = require('./invoice-lines')
const { validateValues } = require('./validate-values')
const { getScheme } = require('./get-scheme')

const enrichPaymentRequest = async (paymentRequest) => {
  validateType(paymentRequest)
  const scheme = getScheme(paymentRequest.sourceSystem)
  await enrichHeader(paymentRequest, scheme)
  validateHeader(paymentRequest)
  paymentRequest.invoiceLines = await enrichInvoiceLines(paymentRequest.invoiceLines, paymentRequest.sourceSystem, paymentRequest.marketingYear, scheme)
  validateValues(paymentRequest.value, paymentRequest.invoiceLines)
}

module.exports = {
  enrichPaymentRequest
}
