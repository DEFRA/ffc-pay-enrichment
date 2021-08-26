const schema = require('./schemas/header')

const validateHeader = (header) => {
  const validationResult = schema.validate(header)
  if (validationResult.error) {
    throw new Error(`Header is invalid. ${validationResult.error.message}`)
  }
}

module.exports = validateHeader
