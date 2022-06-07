const { GBP, EUR } = require('../../currency')
const { DAX_DATE_FORMAT } = require('../../date-formats')
const { IRREGULAR, ADMINISTRATIVE } = require('../../debt-types')
const { AP, AR } = require('../../ledgers')
const { Q4, M12, T4 } = require('../../schedules')

const Joi = require('joi').extend(require('@joi/date'))

module.exports = Joi.object({
  sourceSystem: Joi.string().required(),
  schemeId: Joi.number().integer().required(),
  ledger: Joi.string().valid(AP, AR).required(),
  deliveryBody: Joi.string().regex(/^[A-Z]{2}\d{2}$/).required(),
  invoiceNumber: Joi.string().required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  sbi: Joi.number().integer().min(105000000).max(999999999).optional(),
  marketingYear: Joi.number().integer().min(2015).less(2099).required(),
  paymentRequestNumber: Joi.number().integer().required(),
  agreementNumber: Joi.string().required(),
  contractNumber: Joi.string().required(),
  currency: Joi.string().valid(GBP, EUR).required(),
  schedule: Joi.string().valid(Q4, M12, T4).optional(),
  dueDate: Joi.date().format(DAX_DATE_FORMAT),
  value: Joi.number().integer().required(),
  invoiceLines: Joi.array().required(),
  debtType: Joi.string().valid(IRREGULAR, ADMINISTRATIVE).optional(),
  recoveryDate: Joi.string().optional(),
  originalSettlementDate: Joi.date().format(DAX_DATE_FORMAT).optional(),
  correlationId: Joi.string().guid().optional()
})
