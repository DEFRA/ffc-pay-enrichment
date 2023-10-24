const { MessageReceiver } = require('ffc-messaging')
const { messageConfig } = require('../config')
const { processPaymentMessage } = require('./process-payment-message')
const { processCustomerMessage } = require('./process-customer-message')
const paymentReceivers = []
let customerReceiver

const start = async () => {
  for (let i = 0; i < messageConfig.paymentSubscription.numberOfReceivers; i++) {
    let paymentReceiver  // eslint-disable-line
    const paymentAction = message => processPaymentMessage(message, paymentReceiver)
    paymentReceiver = new MessageReceiver(messageConfig.paymentSubscription, paymentAction)
    paymentReceivers.push(paymentReceiver)
    await paymentReceiver.subscribe()
    console.info(`Receiver ${i + 1} ready to receive payment requests`)
  }

  const customerAction = message => processCustomerMessage(message, customerReceiver)
  customerReceiver = new MessageReceiver(messageConfig.customerSubscription, customerAction)
  await customerReceiver.subscribe()
  console.info('Ready to receive customer requests')
}

const stop = async () => {
  for (const paymentReceiver of paymentReceivers) {
    await paymentReceiver.closeConnection()
  }
}

module.exports = { start, stop }
