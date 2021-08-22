const config = require('../config')
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendProcessingMessage = async (paymentRequest) => {
  const message = createMessage(paymentRequest)
  const sender = new MessageSender(config.processingTopic)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = sendProcessingMessage
