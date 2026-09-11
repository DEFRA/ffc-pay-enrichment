const { messageConfig } = require('../config')
const { getSender, sendMessage: sendServiceBusMessage } = require('./service-bus')
const { createMessage } = require('./create-message')
const { ENRICHED } = require('../constants/types')

const sendMessage = async (body, type, metadata) => {
  const sender = getSender(getTopic(type))
  const message = createMessage(body, type, metadata)
  await sendServiceBusMessage(sender, message)
}

const getTopic = (type) => {
  return type === ENRICHED ? messageConfig.processingTopic : messageConfig.responseTopic
}

module.exports = {
  sendMessage
}
