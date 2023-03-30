const config = require('../config')
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')
const { ENRICHED } = require('../constants/types')

const sendMessage = async (body, type, metadata) => {
  const message = createMessage(body, type, metadata)
  const topic = getTopic(type)
  const sender = new MessageSender(topic)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

const getTopic = (type) => {
  return type === ENRICHED ? config.processingTopic : config.responseTopic
}

module.exports = sendMessage
