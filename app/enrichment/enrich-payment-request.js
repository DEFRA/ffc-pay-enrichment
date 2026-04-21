const { validateType } = require('./validate-type')
const { getScheme } = require('./get-scheme')
const { enrichHeader } = require('./header')
const { validateHeader } = require('./validate-header')
const { enrichInvoiceLines } = require('./invoice-lines')
const { validateValues } = require('./validate-values')
const accountingValueSchemes = require('../constants/accounting-value-schemes')

const enrichPaymentRequest = async (paymentRequest) => {
  validateType(paymentRequest)
  const scheme = getScheme(paymentRequest.schemeId, paymentRequest.sourceSystem, paymentRequest.pillar)
  paymentRequest.providesAccountingValues = accountingValueSchemes.includes(paymentRequest.schemeId)
  await enrichHeader(paymentRequest, scheme)
  await validateHeader(paymentRequest)
  paymentRequest.invoiceLines = await enrichInvoiceLines(paymentRequest.invoiceLines, paymentRequest.schemeId, paymentRequest.marketingYear, scheme)
  validateValues(paymentRequest.value, paymentRequest.invoiceLines, paymentRequest.providesAccountingValues)
}

module.exports = {
  enrichPaymentRequest
}
