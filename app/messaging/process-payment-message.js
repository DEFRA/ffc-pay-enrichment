const enrichPaymentRequest = require('../enrichment')
const sendMessage = require('./send-message')
const util = require('util')
const { VALIDATION } = require('../errors')
const { sendEnrichmentEvent, sendEnrichmentErrorEvent } = require('../event')
const { ENRICHED, ACCEPTED, REJECTED } = require('./types')

const processPaymentMessage = async (message, receiver) => {
  const paymentRequest = message.body
  try {
    console.log('Payment request received:', util.inspect(paymentRequest, false, null, true))
    await enrichPaymentRequest(paymentRequest)
    await sendMessage(paymentRequest, ENRICHED)
    await sendMessage({ paymentRequest, accepted: true }, ACCEPTED, { subject: paymentRequest.sourceSystem })
    await receiver.completeMessage(message)
    console.log('Payment request enriched:', util.inspect(paymentRequest, false, null, true))
    await sendEnrichmentEvent(paymentRequest)
  } catch (err) {
    console.error('Unable to process payment request:', util.inspect(err.message, false, null, true))
    await sendEnrichmentErrorEvent(paymentRequest, err)
    if (err.category === VALIDATION) {
      await sendMessage({ paymentRequest, accepted: false, error: err.message }, REJECTED, { subject: paymentRequest?.sourceSystem })
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processPaymentMessage
