const { convertToPence } = require('../currency-convert')
const createInvoiceNumber = require('./create-invoice-number')
const getDeliveryBody = require('./get-delivery-body')
const getFrn = require('./get-frn')
const getSchemeId = require('./get-scheme-id')
const { AP } = require('../ledgers')
const { convertToDaxDate } = require('../date-convert')

const enrichHeader = async (paymentRequest) => {
  paymentRequest.invoiceNumber = createInvoiceNumber(paymentRequest)
  paymentRequest.schemeId = await getSchemeId(paymentRequest.sourceSystem)
  paymentRequest.ledger = AP
  paymentRequest.value = convertToPence(paymentRequest.value)
  paymentRequest.frn = paymentRequest.frn ?? await getFrn(paymentRequest.sbi)
  paymentRequest.deliveryBody = await getDeliveryBody(paymentRequest.schemeId)
  paymentRequest.dueDate = convertToDaxDate(paymentRequest.dueDate)
}

module.exports = enrichHeader
