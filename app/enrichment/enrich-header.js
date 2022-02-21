const { convertToPence } = require('../currency-convert')
const createInvoiceNumber = require('./create-invoice-number')
const getFrn = require('./get-frn')
const { AP } = require('../ledgers')
const { convertToDaxDate } = require('../date-convert')

const enrichHeader = async (paymentRequest, scheme) => {
  paymentRequest.invoiceNumber = createInvoiceNumber(paymentRequest)
  paymentRequest.schemeId = scheme.schemeId
  paymentRequest.ledger = AP
  paymentRequest.value = convertToPence(paymentRequest.value)
  paymentRequest.frn = paymentRequest.frn ?? await getFrn(paymentRequest.sbi)
  paymentRequest.deliveryBody = scheme.deliveryBody
  paymentRequest.dueDate = convertToDaxDate(paymentRequest.dueDate)
}

module.exports = enrichHeader
