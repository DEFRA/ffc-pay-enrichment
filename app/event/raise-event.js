const { EventPublisher } = require('ffc-pay-event-publisher')
const config = require('../config')

const raiseEvent = async (event) => {
  const eventPublisher = new EventPublisher(config.eventTopic)
  await eventPublisher.publishEvent(event)
}

module.exports = raiseEvent
