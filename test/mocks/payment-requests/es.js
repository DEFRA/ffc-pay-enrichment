const { getSchemeIds } = require('ffc-pay-schemes')
const paymentRequest = require('./payment-request')
const esInvoiceLine = require('./es-invoice-line')
const { ES_INVOICE_NUMBER } = require('../values/invoice-number')
const { VENDOR } = require('../values/vendor')

const { ES } = getSchemeIds()

module.exports = {
  ...paymentRequest,
  schemeId: ES,
  invoiceNumber: ES_INVOICE_NUMBER,
  vendor: VENDOR,
  invoiceLines: [esInvoiceLine]
}
