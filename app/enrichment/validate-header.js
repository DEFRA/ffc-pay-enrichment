const { VALIDATION } = require('../constants/errors')
const schema = require('./schemas/header')

const validateHeader = (header) => {
  const validationResult = schema.validate(header, { abortEarly: false })
  if (validationResult.error) {
    const error = new Error(`Header is invalid, ${validationResult.error.message}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = {
  validateHeader
}
