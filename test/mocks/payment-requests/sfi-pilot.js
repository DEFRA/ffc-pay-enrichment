const { getSchemeIds } = require('ffc-pay-schemes')
const { SFI_PILOT_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

const { SFI_PILOT } = getSchemeIds()

module.exports = {
  ...paymentRequest,
  schemeId: SFI_PILOT,
  invoiceNumber: SFI_PILOT_INVOICE_NUMBER
}
