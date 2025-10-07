const { COMBINED_OFFER } = require('../../../app/constants/schemes')
const { COMBINED_OFFER_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: COMBINED_OFFER,
  invoiceNumber: COMBINED_OFFER_INVOICE_NUMBER
}
