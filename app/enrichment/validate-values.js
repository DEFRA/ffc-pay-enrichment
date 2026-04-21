const { VALIDATION } = require('../constants/errors')

const validateValues = (value, invoiceLines, providesAccountingValues) => {
  const lineValues = invoiceLines.reduce((x, y) => x + y.value, 0)

  if ((providesAccountingValues && lineValues * -1 !== value) || (!providesAccountingValues && lineValues !== value)) {
    const error = new Error(`Payment request is invalid. Invoice line values (${lineValues}) do not match header (${value})`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = {
  validateValues
}
