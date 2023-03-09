const { EventPublisher } = require('ffc-pay-event-publisher')
const config = require('../config')
const { ENRICHED } = require('../constants/events')
const { SOURCE } = require('../constants/source')
const raiseEvent = require('./raise-event')

const sendEnrichmentEvent = async (paymentRequestComparison) => {
  if (config.useV1Events) {
    await sendV1EnrichmentEvent(paymentRequestComparison)
  }
  if (config.useV2Events) {
    await sendV2EnrichmentEvent(paymentRequestComparison.paymentRequest)
  }
}

const sendV1EnrichmentEvent = async (paymentRequestComparison) => {
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

const sendV2EnrichmentEvent = async (paymentRequest) => {
  const event = {
    source: SOURCE,
    type: ENRICHED,
    data: paymentRequest
  }
  const eventPublisher = new EventPublisher(config.eventsTopic)
  await eventPublisher.publishEvent(event)
}

module.exports = sendEnrichmentEvent
