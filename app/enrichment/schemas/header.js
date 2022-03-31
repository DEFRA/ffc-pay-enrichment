const Joi = require('joi').extend(require('@joi/date'))

module.exports = Joi.object({
  sourceSystem: Joi.string().required(),
  schemeId: Joi.number().integer().required(),
  ledger: Joi.string().valid('AP', 'AR'),
  deliveryBody: Joi.string().regex(/^[A-Z]{2}\d{2}$/).required(),
  invoiceNumber: Joi.string().required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  sbi: Joi.number().integer().min(105000000).max(999999999).optional(),
  marketingYear: Joi.number().integer().min(2015).less(2099).required(),
  paymentRequestNumber: Joi.number().integer().required(),
  agreementNumber: Joi.string().required(),
  contractNumber: Joi.string().required(),
  currency: Joi.string().valid('GBP', 'EUR').required(),
  schedule: Joi.string().regex(/^[A-Z]{1}\d+$/),
  dueDate: Joi.date().format('DD/MM/YYYY'),
  value: Joi.number().required(),
  invoiceLines: Joi.array().required(),
  debtType: Joi.string().allow(''),
  recoveryDate: Joi.string().allow(''),
  originalSettlementDate: Joi.string().allow(''),
  correlationId: Joi.string().required()
})
