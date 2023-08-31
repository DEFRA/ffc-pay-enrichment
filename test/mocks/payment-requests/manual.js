const { MANUAL } = require('../../../app/constants/schemes')
const { MANUAL_INVOICE_NUMBER } = require('../values/invoice-number')
const { MANUAL_ORIGINAL_INVOICE_NUMBER } = require('../values/original-invoice-number')
const { ORIGINAL_SETTLEMENT_DATE } = require('../values/original-settlement-date')
const { MANUAL_INVOICE_CORRECTION_REFERENCE } = require('../values/invoice-correction-reference')
const { PILLAR } = require('../values/pillar')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: MANUAL,
  invoiceNumber: MANUAL_INVOICE_NUMBER,
  originalInvoiceNumber: MANUAL_ORIGINAL_INVOICE_NUMBER,
  originalSettlementDate: ORIGINAL_SETTLEMENT_DATE,
  invoiceCorrectionReference: MANUAL_INVOICE_CORRECTION_REFERENCE,
  pillar: PILLAR
}
