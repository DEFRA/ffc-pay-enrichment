const { getCorrelationId } = require('./get-correlation-id')
const { getAgreementNumber } = require('./get-agreement-number')
const { createInvoiceNumber } = require('./create-invoice-number')
const { getFrn } = require('./get-frn')
const { getLedger } = require('./get-ledger')
const { getValue } = require('./get-value')
const { getCurrency } = require('./get-currency')
const { confirmDueDate } = require('./confirm-due-date')
const { convertToDaxDate } = require('../../date-convert')

const enrichHeader = async (paymentRequest, scheme) => {
  paymentRequest.deliveryBody = scheme?.deliveryBody
  paymentRequest.schemeId = scheme?.schemeId
  paymentRequest.correlationId = getCorrelationId(paymentRequest.correlationId)
  paymentRequest.agreementNumber = getAgreementNumber(paymentRequest)
  paymentRequest.invoiceNumber = createInvoiceNumber(paymentRequest)
  paymentRequest.frn = await getFrn(paymentRequest)
  paymentRequest.ledger = getLedger(paymentRequest.ledger)
  paymentRequest.value = getValue(paymentRequest)
  paymentRequest.currency = getCurrency(paymentRequest.currency)
  paymentRequest.dueDate = confirmDueDate(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
  paymentRequest.eventDate = convertToDaxDate(paymentRequest.eventDate, false)
}

module.exports = {
  enrichHeader
}
