const { getCorrelationId } = require('./get-correlation-id')
const { getContractNumber } = require('./get-contract-number')
const { getAgreementNumber } = require('./get-agreement-number')
const { createInvoiceNumber } = require('./create-invoice-number')
const { getFrn } = require('./get-frn')
const { getLedger } = require('./get-ledger')
const { getValue } = require('./get-value')
const { getCurrency } = require('./get-currency')
const { confirmDueDate } = require('./confirm-due-date')
const { convertToDaxDate } = require('../../date-convert')
const { getMarketingYear } = require('./get-marketing-year')
const { getDeliveryBody } = require('./get-delivery-body')

const enrichHeader = async (paymentRequest, scheme) => {
  paymentRequest.deliveryBody = getDeliveryBody(paymentRequest, scheme)
  paymentRequest.schemeId = scheme?.schemeId
  paymentRequest.correlationId = getCorrelationId(paymentRequest.correlationId)
  paymentRequest.contractNumber = getContractNumber(paymentRequest)
  paymentRequest.agreementNumber = getAgreementNumber(paymentRequest)
  paymentRequest.invoiceNumber = createInvoiceNumber(paymentRequest)
  paymentRequest.frn = await getFrn(paymentRequest)
  paymentRequest.ledger = getLedger(paymentRequest.ledger)
  paymentRequest.value = getValue(paymentRequest)
  paymentRequest.currency = getCurrency(paymentRequest.currency)
  paymentRequest.dueDate = confirmDueDate(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
  paymentRequest.eventDate = convertToDaxDate(paymentRequest.eventDate, false)
  paymentRequest.claimDate = convertToDaxDate(paymentRequest.claimDate, false)
  paymentRequest.recoveryDate = paymentRequest.recoveryDate ? convertToDaxDate(paymentRequest.recoveryDate, false) : undefined
  paymentRequest.originalSettlementDate = paymentRequest.originalSettlementDate ? convertToDaxDate(paymentRequest.originalSettlementDate, false) : undefined
  paymentRequest.marketingYear = getMarketingYear(paymentRequest)
}

module.exports = {
  enrichHeader
}
