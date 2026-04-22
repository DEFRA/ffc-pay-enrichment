const { VALIDATION } = require('../constants/errors')

const validateValues = (value, invoiceLines, providesAccountingValues) => {
  const lineValues = invoiceLines.reduce((x, y) => x + y.value, 0)

  // Some schemes now provide the accounting values  directly instead of positive payment amounts.
  // For these schemes, the top level value should be the sum of invoice lines multiplied by -1.
  // For all other schemes, the invoice lines value should match the top level header value.
  if ((providesAccountingValues && lineValues * -1 !== value) || (!providesAccountingValues && lineValues !== value)) {
    const error = new Error(`Payment request is invalid. Invoice line values (${lineValues}) do not match header (${value})`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = {
  validateValues
}
