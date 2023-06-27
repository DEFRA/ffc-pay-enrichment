const { ES } = require('../../../app/constants/schemes')
const { ES_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: ES,
  invoiceNumber: ES_INVOICE_NUMBER
}
