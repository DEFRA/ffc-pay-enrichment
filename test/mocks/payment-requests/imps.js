const { IMPS } = require('../../../app/constants/schemes')
const { IMPS_INVOICE_NUMBER } = require('../values/invoice-number')
const { TRADER } = require('../values/trader')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: IMPS,
  invoiceNumber: IMPS_INVOICE_NUMBER,
  trader: TRADER
}
