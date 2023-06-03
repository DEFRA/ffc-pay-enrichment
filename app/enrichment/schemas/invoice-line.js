const Joi = require('joi')

module.exports = Joi.object({
  sourceSystem: Joi.string().required(),
  standardCode: Joi.string().optional(),
  schemeCode: Joi.string().required(),
  accountCode: Joi.alternatives().conditional('sourceSystem', { is: 'Manual', then: Joi.string().regex(/^[A-Z]{3}\d{3}$/).required(), otherwise: Joi.string().regex(/^[A-Z]{3}\d{3}$/).optional() }),
  fundCode: Joi.string().regex(/^[A-Z]{3}\d{2}$/).required(),
  agreementNumber: Joi.string().optional(),
  description: Joi.string().regex(/^[A-Z]{1}\d{2}\s-\s.+$/).required(),
  value: Joi.number().integer().required(),
  convergence: Joi.boolean().optional(),
  deliveryBody: Joi.string().regex(/^[A-Z]{2}\d{2}$/).required(),
  marketingYear: Joi.number().integer().min(2015).less(2099).required(),
  stateAid: Joi.boolean().optional()
})
