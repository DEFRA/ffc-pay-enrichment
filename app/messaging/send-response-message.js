const config = require('../config')
const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')

const sendResponseMessage = async (paymentRequest) => {
  const message = createMessage(paymentRequest)
  const sender = new MessageSender(config.responseTopic)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = sendResponseMessage
