const getFundCode = require('./get-fund-code')
const enrichHeader = require('./enrich-header')
const validatePaymentRequest = require('./validate-header')
const processInvoiceLines = require('./process-invoice-lines')
const validateValues = require('./validate-values')

const enrichPaymentRequest = async (paymentRequest) => {
  await enrichHeader(paymentRequest)
  validatePaymentRequest(paymentRequest)
  const fundCode = await getFundCode(paymentRequest.schemeId)  
  paymentRequest.invoiceLines = await processInvoiceLines(paymentRequest.invoiceLines, fundCode)
  validateValues(paymentRequest.value, paymentRequest.invoiceLines)
}

module.exports = enrichPaymentRequest
