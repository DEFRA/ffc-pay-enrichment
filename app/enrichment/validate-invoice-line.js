const schema = require('./schemas/invoice-line')

const validateInvoiceLine = (invoiceLine) => {
  const validationResult = schema.validate(invoiceLine)
  if (validationResult.error) {
    const error = new Error('Invoice line is invalid', { cause: validationResult.error })
    error.category = 'validation'
    throw error
  }
}

module.exports = validateInvoiceLine
