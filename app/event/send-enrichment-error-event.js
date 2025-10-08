const { messageConfig } = require('../config')
const { EventPublisher } = require('ffc-pay-event-publisher')
const { PAYMENT_REJECTED } = require('../constants/events')
const { SOURCE } = require('../constants/source')

const sendEnrichmentErrorEvent = async (paymentRequest, error) => {
  const event = {
    source: SOURCE,
    type: PAYMENT_REJECTED,
    data: {
      message: error.message,
      ...paymentRequest
    }
  }
  const eventPublisher = new EventPublisher(messageConfig.eventsTopic)
  await eventPublisher.publishEvent(event)
}

module.exports = {
  sendEnrichmentErrorEvent
}
