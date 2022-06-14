const { VALIDATION } = require('../errors')

const validateType = (paymentRequest) => {
  if (typeof paymentRequest !== 'object' || Array.isArray(paymentRequest) || !paymentRequest) {
    const error = new Error('Payment request structure is invalid. Must be an object.')
    error.category = VALIDATION
    throw error
  }
}

module.exports = validateType
