const raiseEvent = require('./raise-event')

const sendEnrichmentErrorEvent = async (paymentRequest, error) => {
  const correlationId = paymentRequest.correlationId
  const event = {
    id: correlationId,
    name: 'payment-request-enrichment-error',
    type: 'error',
    message: error.message,
    data: { paymentRequest }
  }
  await raiseEvent(event, 'error')
}

module.exports = sendEnrichmentErrorEvent
