const Joi = require('joi')
const { MANUAL, Genesis, IMPS, GLOS } = require('../../constants/source-systems')

module.exports = Joi.object({
  sourceSystem: Joi.string().required(),
  standardCode: Joi.string().optional(),
  schemeCode: Joi.string().required(),
  accountCode: Joi.alternatives().conditional('sourceSystem', { is: Joi.string().valid(MANUAL, Genesis, GLOS, IMPS), then: Joi.string().regex(/^[A-Z]{3}\d{3}$/).required(), otherwise: Joi.string().regex(/^[A-Z]{3}\d{3}$/).optional() }),
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
