const { SFI_EXPANDED } = require('../../../app/constants/schemes')
const { SFI_EXPANDED_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: SFI_EXPANDED,
  invoiceNumber: SFI_EXPANDED_INVOICE_NUMBER
}
