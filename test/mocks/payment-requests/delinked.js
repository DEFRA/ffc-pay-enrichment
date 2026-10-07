const { getSchemeIds } = require('ffc-pay-schemes')
const { DELINKED_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

const { DELINKED } = getSchemeIds()

module.exports = {
  ...paymentRequest,
  schemeId: DELINKED,
  invoiceNumber: DELINKED_INVOICE_NUMBER
}
