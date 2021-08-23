const validateValues = (value, invoiceLines) => {
  const lineValues = invoiceLines.reduce((x, y) => x + y.value, 0)
  if (lineValues !== value) {
    throw new Error(`Payment request is invalid. Invoice line values (${lineValues}) do not match header (${value})`)
  }
}

module.exports = validateValues
