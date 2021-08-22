const enrichPaymentRequest = require('../enrichment')
const sendProcessingMessage = require('./send-processing-message')

async function processPaymentMessage (message, receiver) {
  try {
    const paymentRequest = message.body
    await enrichPaymentRequest(paymentRequest)
    await sendProcessingMessage(paymentRequest)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process payment request:', err)
    await receiver.deadLetterMessage(message)
  }
}

module.exports = processPaymentMessage
