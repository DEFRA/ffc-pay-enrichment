const { EventPublisher } = require('ffc-pay-event-publisher')
const { enrichmentConfig, messageConfig } = require('../config')
const { PAYMENT_ENRICHED } = require('../constants/events')
const { SOURCE } = require('../constants/source')
const raiseEvent = require('./raise-event')

const sendEnrichmentEvent = async (paymentRequestComparison) => {
  if (enrichmentConfig.useV1Events) {
    await sendV1EnrichmentEvent(paymentRequestComparison)
  }
  if (enrichmentConfig.useV2Events) {
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
    type: PAYMENT_ENRICHED,
    data: paymentRequest
  }
  const eventPublisher = new EventPublisher(messageConfig.eventsTopic)
  await eventPublisher.publishEvent(event)
}

module.exports = {
  sendEnrichmentEvent
}
