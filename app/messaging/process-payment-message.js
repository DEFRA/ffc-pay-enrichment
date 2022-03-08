const enrichPaymentRequest = require('../enrichment')
const sendProcessingMessage = require('./send-processing-message')
const util = require('util')
const { VALIDATION } = require('../errors')

async function processPaymentMessage (message, receiver) {
  try {
    const paymentRequest = message.body
    console.log('Payment request received:', util.inspect(paymentRequest, false, null, true))
    await enrichPaymentRequest(paymentRequest)
    await sendProcessingMessage(paymentRequest)
    await receiver.completeMessage(message)
    console.log('Payment request enriched:', util.inspect(paymentRequest, false, null, true))
  } catch (err) {
    console.error('Unable to process payment request:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processPaymentMessage
