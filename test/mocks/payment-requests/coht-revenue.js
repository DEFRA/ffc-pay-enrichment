const { COHT_REVENUE } = require('../../../app/constants/schemes')
const { COHTR_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: COHT_REVENUE,
  invoiceNumber: COHTR_INVOICE_NUMBER
}
