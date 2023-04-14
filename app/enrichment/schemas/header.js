const { GBP, EUR } = require('../../constants/currency')
const { DAX_DATE_FORMAT } = require('../../constants/date-formats')
const { IRREGULAR, ADMINISTRATIVE } = require('../../constants/debt-types')
const { AP, AR } = require('../../constants/ledgers')
const { Q4, M12, T4 } = require('../../constants/schedules')

const Joi = require('joi').extend(require('@joi/date'))

module.exports = Joi.object({
  sourceSystem: Joi.string().required(),
  batch: Joi.string().optional(),
  schemeId: Joi.number().integer().positive().required().messages({ '*': 'Could not map sourceSystem to schemeId' }),
  ledger: Joi.string().valid(AP, AR).required(),
  deliveryBody: Joi.string().required(),
  invoiceNumber: Joi.string().required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  sbi: Joi.number().integer().min(105000000).max(999999999).optional(),
  marketingYear: Joi.number().integer().min(2015).less(2099).required(),
  paymentRequestNumber: Joi.number().integer().positive().required(),
  agreementNumber: Joi.string().required(),
  contractNumber: Joi.string().optional(),
  paymentType: Joi.number().integer().optional(),
  pillar: Joi.string().optional(),
  currency: Joi.string().valid(GBP, EUR).required(),
  schedule: Joi.string().valid(Q4, M12, T4).optional(),
  dueDate: Joi.date().format(DAX_DATE_FORMAT).required(),
  value: Joi.number().integer().required(),
  invoiceLines: Joi.array().required(),
  debtType: Joi.string().valid(IRREGULAR, ADMINISTRATIVE).optional(),
  recoveryDate: Joi.date().format(DAX_DATE_FORMAT).optional(),
  correlationId: Joi.string().guid().required()
})
