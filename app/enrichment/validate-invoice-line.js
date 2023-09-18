const { VALIDATION } = require('../constants/errors')
const schema = require('./schemas/invoice-line')

const validateInvoiceLine = (invoiceLine, schemeId) => {
  const validationResult = schema.validate({ ...invoiceLine, schemeId }, { abortEarly: false, allowUnknown: true })
  if (validationResult.error) {
    const error = new Error(`Invoice line is invalid, ${validationResult.error.message}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = {
  validateInvoiceLine
}
