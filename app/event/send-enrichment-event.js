const { enrichmentConfig, messageConfig } = require('../config')
const { EventPublisher } = require('ffc-pay-event-publisher')
const { SOURCE } = require('../constants/source')
const { PAYMENT_ENRICHED } = require('../constants/events')

const sendEnrichmentEvent = async (paymentRequestComparison) => {
  if (enrichmentConfig.useV2Events) {
    await sendV2EnrichmentEvent(paymentRequestComparison.paymentRequest)
  }
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
