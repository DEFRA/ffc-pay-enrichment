const paymentRequest = require('./payment-request')
const esInvoiceLine = require('./es-invoice-line')
const { ES } = require('../../../app/constants/schemes')
const { ES_INVOICE_NUMBER } = require('../values/invoice-number')
const { VENDOR } = require('../values/vendor')

module.exports = {
  ...paymentRequest,
  schemeId: ES,
  invoiceNumber: ES_INVOICE_NUMBER,
  vendor: VENDOR,
  invoiceLines: [esInvoiceLine]
}
