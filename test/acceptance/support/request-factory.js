const request = require('../fixtures/payment-request')

const createDefaultPaymentRequestWith = (incomingRequest) => {
  request.dueDate = incomingRequest.dueDate
  request.invoiceLines[0].description = incomingRequest.description

  return request
}

module.exports = { createDefaultPaymentRequestWith }
