const { GBP, EUR } = require('../../constants/currency')
const { DAX_DATE_FORMAT } = require('../../constants/date-formats')
const { IRREGULAR, ADMINISTRATIVE } = require('../../constants/debt-types')
const { AP, AR } = require('../../constants/ledgers')
const { Q1, Q2, Q3, Q4, M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, T1, T2, T3, T4 } = require('../../constants/schedules')

const Joi = require('joi').extend(require('@joi/date'))

module.exports = Joi.object({
  sourceSystem: Joi.string().required(),
  batch: Joi.string().optional(),
  schemeId: Joi.number().integer().positive().required().messages({ '*': 'Could not map sourceSystem to schemeId' }),
  ledger: Joi.string().valid(AP, AR).required(),
  deliveryBody: Joi.string().regex(/^[A-Z]{2}\d{2}$/).required(),
  invoiceNumber: Joi.string().required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  sbi: Joi.number().integer().min(105000000).max(999999999).optional(),
  vendor: Joi.string().optional(),
  trader: Joi.string().optional(),
  marketingYear: Joi.number().integer().min(1993).less(2099).optional(),
  paymentRequestNumber: Joi.number().integer().min(0).required(),
  agreementNumber: Joi.string().required(),
  contractNumber: Joi.string().optional(),
  paymentType: Joi.number().integer().optional(),
  exchangeRate: Joi.string().optional(),
  pillar: Joi.string().optional(),
  currency: Joi.string().valid(GBP, EUR).required(),
  schedule: Joi.string().valid(Q1, Q2, Q3, Q4, M1, M2, M3, M4, M5, M6, M7, M8, M9, M10, M11, M12, T1, T2, T3, T4).optional(),
  dueDate: Joi.date().format(DAX_DATE_FORMAT).required(),
  eventDate: Joi.date().format(DAX_DATE_FORMAT).optional(),
  claimDate: Joi.date().format(DAX_DATE_FORMAT).optional(),
  value: Joi.number().integer().required(),
  invoiceLines: Joi.array().required(),
  debtType: Joi.string().valid(IRREGULAR, ADMINISTRATIVE).optional(),
  recoveryDate: Joi.date().format(DAX_DATE_FORMAT).optional(),
  correlationId: Joi.string().guid().required(),
  originalInvoiceNumber: Joi.string().optional(),
  originalSettlementDate: Joi.date().format(DAX_DATE_FORMAT).optional(),
  invoiceCorrectionReference: Joi.string().optional()
})
