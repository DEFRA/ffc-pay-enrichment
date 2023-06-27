const paymentRequest = require('./payment-request')
const esInvoiceLine = require('./es-invoice-line')
const { ES } = require('../../../app/constants/schemes')
const { ES_INVOICE_NUMBER } = require('../values/invoice-number')

module.exports = {
  ...paymentRequest,
  schemeId: ES,
  invoiceNumber: ES_INVOICE_NUMBER,
  invoiceLines: [esInvoiceLine]
}
