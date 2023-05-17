const { MessageSender, MessageReceiver } = require('ffc-messaging')
const config = require('./config')

const sendMessage = async (message) => {
  const sender = new MessageSender(config.paymentTopic)
  await sender.sendMessage({ body: message, type: 'uk.gov.defra.ffc.pay.automation', source: 'ffc-pay-enrichment-acceptance-test' })
  await sender.closeConnection()
}

const getAndDeleteMessages = async (receiver) => {
  const allMessages = []
  const batchSize = 10
  let messages
  try {
    do {
      messages = await receiver.receiveMessages(batchSize, { maxWaitTimeInMs: 20 * 1000 })
      allMessages.push(...messages)
    } while (allMessages.length < batchSize && messages > 0)

    allMessages.forEach(message => receiver.completeMessage(message))

    console.log(`Received and (deleted) ${allMessages.length}`)
    await receiver.closeConnection()

    return allMessages.map(message => message.body)
  } catch (err) {
    throw new Error(err)
  }
}

const receiveMessages = async (suppliedConfig) => {
  const receiver = new MessageReceiver(suppliedConfig)
  return await getAndDeleteMessages(receiver)
}

const clearSubscription = async (config) => {
  const receiver = new MessageReceiver(config)
  console.log(`Clearing Subscription: ${config.topic}/${config.address}`)
  await getAndDeleteMessages(receiver)
}

module.exports = { sendMessage, receiveMessages, clearSubscription }
