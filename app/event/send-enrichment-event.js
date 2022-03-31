const raiseEvent = require('./raise-event')

const sendEnrichmentEvent = async (paymentRequestComparision) => {
  const paymentRequest = paymentRequestComparision.paymentRequest
  const event = {
    id: paymentRequest.correlationId,
    name: 'payment-request-enrichment-event',
    type: 'info',
    message: 'Payment request enriched',
    data: paymentRequestComparision
  }
  await raiseEvent(event)
}

module.exports = sendEnrichmentEvent
