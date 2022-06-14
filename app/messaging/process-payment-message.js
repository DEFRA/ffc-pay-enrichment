const enrichPaymentRequest = require('../enrichment')
const sendMessage = require('./send-message')
const util = require('util')
const { VALIDATION } = require('../errors')
const { sendEnrichmentEvent, sendEnrichmentErrorEvent } = require('../event')
const { ENRICHED, ACCEPTED, REJECTED } = require('./types')

async function processPaymentMessage (message, receiver) {
  const paymentRequest = message.body
  try {
    console.log('Payment request received:', util.inspect(paymentRequest, false, null, true))
    const originalPaymentRequest = JSON.parse(JSON.stringify(paymentRequest))
    await enrichPaymentRequest(paymentRequest)
    await sendMessage(paymentRequest, ENRICHED)
    await sendMessage({ paymentRequest, accepted: true }, ACCEPTED)
    await receiver.completeMessage(message)
    console.log('Payment request enriched:', util.inspect(paymentRequest, false, null, true))
    await sendEnrichmentEvent({ originalPaymentRequest, paymentRequest })
  } catch (err) {
    console.error('Unable to process payment request:', util.inspect(err.message, false, null, true))
    await sendEnrichmentErrorEvent(message.body, err)
    if (err.category === VALIDATION) {
      await sendMessage({ paymentRequest, accepted: false, error: err.message }, REJECTED)
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processPaymentMessage
