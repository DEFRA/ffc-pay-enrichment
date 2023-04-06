const { MANUAL } = require('../../../app/constants/schemes')
const { MANUAL_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: MANUAL,
  invoiceNumber: MANUAL_INVOICE_NUMBER
}
