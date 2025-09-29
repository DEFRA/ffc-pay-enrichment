const { messageConfig } = require('../config')
const { EventPublisher } = require('ffc-pay-event-publisher')
const { SOURCE } = require('../constants/source')
const { PAYMENT_ENRICHED } = require('../constants/events')

const sendEnrichmentEvent = async (paymentRequestComparison) => {
  const event = {
    source: SOURCE,
    type: PAYMENT_ENRICHED,
    data: paymentRequestComparison.paymentRequest
  }
  const eventPublisher = new EventPublisher(messageConfig.eventsTopic)
  await eventPublisher.publishEvent(event)
}

module.exports = {
  sendEnrichmentEvent
}
