const Joi = require('joi')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  processingActive: Joi.boolean().default(true),
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT)
})

const config = {
  processingActive: process.env.PROCESSING_ACTIVE,
  env: process.env.NODE_ENV
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The enrichment config is invalid. ${result.error.message}`)
}

module.exports = result.value
