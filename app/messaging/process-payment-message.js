const enrichPaymentRequest = require('../enrichment')
const sendProcessingMessage = require('./send-processing-message')
const util = require('util')
const { VALIDATION } = require('../errors')
const { sendEnrichmentEvent, sendEnrichmentErrorEvent } = require('../event')

async function processPaymentMessage (message, receiver) {
  try {
    const paymentRequest = message.body
    console.log('Payment request received:', util.inspect(paymentRequest, false, null, true))
    const originalPaymentRequest = JSON.parse(JSON.stringify(paymentRequest))
    await enrichPaymentRequest(paymentRequest)
    await sendProcessingMessage(paymentRequest)
    await receiver.completeMessage(message)
    console.log('Payment request enriched:', util.inspect(paymentRequest, false, null, true))
    await sendEnrichmentEvent({ originalPaymentRequest, paymentRequest })
  } catch (err) {
    console.error('Unable to process payment request:', err)
    await sendEnrichmentErrorEvent(message.body, err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processPaymentMessage
