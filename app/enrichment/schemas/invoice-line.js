const Joi = require('joi')
const { MANUAL, ES, IMPS, FC } = require('../../constants/schemes')
module.exports = Joi.object({
  schemeId: Joi.number().integer().required(),
  standardCode: Joi.string().optional(),
  schemeCode: Joi.string().required(),
  accountCode: Joi.alternatives().conditional('schemeId', { is: Joi.string().valid(MANUAL, ES, FC, IMPS), then: Joi.string().regex(/^[A-Z]{3}\d{3}$/).required(), otherwise: Joi.string().regex(/^[A-Z]{3}\d{3}$/).optional() }),
  fundCode: Joi.string().regex(/^[A-Z]{3}\d{2}$/).required(),
  agreementNumber: Joi.string().optional(),
  description: Joi.string().required(),
  value: Joi.number().integer().required(),
  convergence: Joi.boolean().optional(),
  deliveryBody: Joi.string().regex(/^[A-Z]{2}\d{2}$/).required(),
  marketingYear: Joi.number().integer().min(1993).less(2099).optional(),
  stateAid: Joi.boolean().optional(),
  exchangeRate: Joi.string().optional()
})
