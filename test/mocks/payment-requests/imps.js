const { getSchemeIds } = require('ffc-pay-schemes')
const { IMPS_INVOICE_NUMBER } = require('../values/invoice-number')
const { TRADER } = require('../values/trader')
const paymentRequest = require('./payment-request')

const { IMPS } = getSchemeIds()

module.exports = {
  ...paymentRequest,
  schemeId: IMPS,
  invoiceNumber: IMPS_INVOICE_NUMBER,
  trader: TRADER
}
