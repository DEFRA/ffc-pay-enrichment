const { v4: uuidv4 } = require('uuid')
const { convertToPence } = require('../currency-convert')
const { createInvoiceNumber } = require('./create-invoice-number')
const { getFrn } = require('./get-frn')
const { AP } = require('../constants/ledgers')
const { confirmDueDate } = require('./confirm-due-date')
const { GBP } = require('../constants/currency')
const { convertToDaxDate } = require('../date-convert')

const enrichHeader = async (paymentRequest, scheme) => {
  paymentRequest.correlationId = paymentRequest.correlationId ?? uuidv4()
  paymentRequest.schemeId = scheme?.schemeId
  paymentRequest.agreementNumber = paymentRequest.agreementNumber ?? paymentRequest.contractNumber
  paymentRequest.invoiceNumber = createInvoiceNumber(paymentRequest)
  paymentRequest.ledger = paymentRequest.ledger ?? AP
  paymentRequest.value = convertToPence(paymentRequest.value)
  paymentRequest.frn = paymentRequest.frn ?? await getFrn(paymentRequest)
  paymentRequest.deliveryBody = scheme?.deliveryBody
  paymentRequest.dueDate = confirmDueDate(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
  paymentRequest.eventDate = convertToDaxDate(paymentRequest.eventDate)
  paymentRequest.currency = paymentRequest.currency ?? GBP
}

module.exports = {
  enrichHeader
}
