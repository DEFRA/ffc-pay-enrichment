const { VALIDATION } = require('../errors')
const schema = require('./schemas/header')

const validateHeader = (header) => {
  const validationResult = schema.validate(header)
  if (validationResult.error) {
    const error = new Error('Header is invalid', { cause: validationResult.error })
    error.category = VALIDATION
    throw error
  }
}

module.exports = validateHeader
