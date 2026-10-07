const { getSchemeProperties } = require('ffc-pay-schemes')
const { validateType } = require('./validate-type')
const { enrichHeader } = require('./header')
const { validateHeader } = require('./validate-header')
const { enrichInvoiceLines } = require('./invoice-lines')
const { validateValues } = require('./validate-values')

const enrichPaymentRequest = async (paymentRequest) => {
  validateType(paymentRequest)
  const scheme = getSchemeProperties(paymentRequest.schemeId, paymentRequest.sourceSystem, paymentRequest.pillar)
  await enrichHeader(paymentRequest, scheme)
  await validateHeader(paymentRequest)
  paymentRequest.invoiceLines = await enrichInvoiceLines(paymentRequest.invoiceLines, paymentRequest.schemeId, paymentRequest.marketingYear, scheme)
  validateValues(paymentRequest.value, paymentRequest.invoiceLines, paymentRequest.providesAccountingValues)
}

module.exports = {
  enrichPaymentRequest
}
