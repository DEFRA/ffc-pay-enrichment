const { COHT_CAPITAL } = require('../../../app/constants/schemes')
const { COHTC_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: COHT_CAPITAL,
  invoiceNumber: COHTC_INVOICE_NUMBER
}
