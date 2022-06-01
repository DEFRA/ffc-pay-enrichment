const { VALIDATION } = require('../errors')
const schema = require('./schemas/invoice-line')

const validateInvoiceLine = (invoiceLine) => {
  const validationResult = schema.validate(invoiceLine, { abortEarly: false })
  if (validationResult.error) {
    const error = new Error('Invoice line is invalid', { cause: validationResult.error })
    error.category = VALIDATION
    throw error
  }
}

module.exports = validateInvoiceLine
