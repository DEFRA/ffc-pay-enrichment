const { getSchemeIds } = require('ffc-pay-schemes')
const { COHTR_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

const { COHT_REVENUE } = getSchemeIds()

module.exports = {
  ...paymentRequest,
  schemeId: COHT_REVENUE,
  invoiceNumber: COHTR_INVOICE_NUMBER
}
