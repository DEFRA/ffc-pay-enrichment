const raiseEvent = require('./raise-event')

const sendEnrichmentEvent = async (paymentRequestComparison) => {
  const paymentRequest = paymentRequestComparison.paymentRequest
  const event = {
    id: paymentRequest.correlationId,
    name: 'payment-request-enrichment',
    type: 'info',
    message: 'Payment request enriched',
    data: paymentRequestComparison
  }
  await raiseEvent(event)
}

module.exports = sendEnrichmentEvent
