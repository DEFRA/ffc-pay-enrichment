const { v4: uuidv4 } = require('uuid')
const { convertToPence } = require('../currency-convert')
const createInvoiceNumber = require('./create-invoice-number')
const getFrn = require('./get-frn')
const { AP } = require('../constants/ledgers')
const { convertToDaxDate } = require('../date-convert')
const { GBP } = require('../constants/currency')

const enrichHeader = async (paymentRequest, scheme) => {
  paymentRequest.correlationId = paymentRequest.correlationId ?? uuidv4()
  paymentRequest.schemeId = scheme?.schemeId
  paymentRequest.agreementNumber = paymentRequest.agreementNumber ?? paymentRequest.contractNumber
  paymentRequest.invoiceNumber = createInvoiceNumber(paymentRequest)
  paymentRequest.ledger = AP
  paymentRequest.value = convertToPence(paymentRequest.value)
  paymentRequest.frn = paymentRequest.frn ?? await getFrn(paymentRequest.sbi)
  paymentRequest.deliveryBody = scheme?.deliveryBody
  paymentRequest.dueDate = convertToDaxDate(paymentRequest.dueDate)
  paymentRequest.currency = paymentRequest.currency ?? GBP
}

module.exports = enrichHeader
