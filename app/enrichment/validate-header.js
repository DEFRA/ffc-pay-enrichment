const { VALIDATION } = require('../constants/errors')
const schema = require('./schemas/header')
const { verifySBI } = require('./verify-sbi')

const validateHeader = async (header) => {
  const validationResult = schema.validate(header, { abortEarly: false, allowUnknown: true })
  const sbiError = await verifySBI(header)
  if (validationResult.error || sbiError) {
    const errorMessage = validationResult.error ? validationResult.error.message : sbiError
    const error = new Error(`Header is invalid, ${errorMessage}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = {
  validateHeader
}
