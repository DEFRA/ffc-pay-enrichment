const Joi = require('joi')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT),
  useV1Events: Joi.boolean().default(true),
  useV2Events: Joi.boolean().default(true)
})

const config = {
  env: process.env.NODE_ENV,
  useV1Events: process.env.USE_V1_EVENTS,
  useV2Events: process.env.USE_V2_EVENTS
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The enrichment config is invalid. ${result.error.message}`)
}

module.exports = result.value
