const { FPTT } = require('../../constants/schemes')
const { convertToPence } = require('../../currency-convert')

const getValue = (paymentRequest) => {
  if (paymentRequest.value) {
    return convertToPence(paymentRequest.value)
  }

  // Some schemes now provide the accounting values  directly instead of positive payment amounts.
  // For these schemes, where we need to calculate a top level value, we expect this is negative.
  // Therefore, if a top level value is not supplied, the sum of invoice lines should be multiplied by -1.
  const schemeProvidesAccountingValues = [FPTT].includes(paymentRequest.schemeId)
  if (schemeProvidesAccountingValues) {
    return (paymentRequest.invoiceLines?.reduce((total, line) => {
      return total + convertToPence(line.value)
    }, 0) * -1)
  }
  return paymentRequest.invoiceLines?.reduce((total, line) => {
    return total + convertToPence(line.value)
  }, 0)
}

module.exports = {
  getValue
}
