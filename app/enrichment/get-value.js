const { convertToPence } = require('../currency-convert')

const getValue = (paymentRequest) => {
  if (paymentRequest.value) {
    return convertToPence(paymentRequest.value)
  }
  return paymentRequest.invoiceLines?.reduce((total, line) => {
    return total + convertToPence(line.value)
  }, 0)
}

module.exports = {
  getValue
}
