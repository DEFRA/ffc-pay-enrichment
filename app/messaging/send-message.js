const { MessageSender } = require('ffc-messaging')
const { messageConfig } = require('../config')
const { createMessage } = require('./create-message')
const { ENRICHED } = require('../constants/types')

const sendMessage = async (body, type, metadata) => {
  const message = createMessage(body, type, metadata)
  const topic = getTopic(type)
  const sender = new MessageSender(topic)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

const getTopic = (type) => {
  return type === ENRICHED ? messageConfig.processingTopic : messageConfig.responseTopic
}

module.exports = {
  sendMessage
}
