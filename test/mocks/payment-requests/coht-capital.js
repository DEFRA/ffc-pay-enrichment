const { getSchemeIds } = require('ffc-pay-schemes')
const { COHTC_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

const { COHT_CAPITAL } = getSchemeIds()

module.exports = {
  ...paymentRequest,
  schemeId: COHT_CAPITAL,
  invoiceNumber: COHTC_INVOICE_NUMBER
}
