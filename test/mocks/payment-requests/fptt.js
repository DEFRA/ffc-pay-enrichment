const { getSchemeIds } = require('ffc-pay-schemes')
const { FPTT_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

const { FPTT } = getSchemeIds()

module.exports = {
  ...paymentRequest,
  schemeId: FPTT,
  invoiceNumber: FPTT_INVOICE_NUMBER
}
