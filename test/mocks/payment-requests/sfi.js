const { SFI_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  invoiceNumber: SFI_INVOICE_NUMBER
}
