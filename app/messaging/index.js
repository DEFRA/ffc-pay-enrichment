const { messageConfig } = require('../config')
const { createServiceBusClient, createReceiver, subscribeReceiver, closeSenders } = require('./service-bus')
const { processPaymentMessage } = require('./process-payment-message')
const { processCustomerMessage } = require('./process-customer-message')
const { createDiagnosticsHandler } = require('./diagnostics')

let sbClient
let customerReceiver

const receivers = []

const start = async () => {
  sbClient = createServiceBusClient(messageConfig.paymentSubscription)
  for (let i = 0; i < messageConfig.paymentSubscription.numberOfReceivers; i++) {
    let paymentReceiver // eslint-disable-line prefer-const
    const paymentAction = message => processPaymentMessage(message, paymentReceiver)
    paymentReceiver = createReceiver(sbClient, messageConfig.paymentSubscription)
    subscribeReceiver(paymentReceiver, paymentAction, createDiagnosticsHandler(`payment-receiver-${i + 1}`), messageConfig.paymentSubscription)

    receivers.push(paymentReceiver)
    console.info(`Receiver ${i + 1} ready to receive payment requests`)
  }

  const customerAction = message => processCustomerMessage(message, customerReceiver)
  customerReceiver = createReceiver(sbClient, messageConfig.customerSubscription)
  subscribeReceiver(customerReceiver, customerAction, createDiagnosticsHandler('customer-receiver'), messageConfig.customerSubscription)
  receivers.push(customerReceiver)

  console.info('Ready to receive customer requests')
}

const stop = async () => {
  for (const receiver of receivers) {
    try {
      await receiver.close()
    } catch (err) {
      console.error('Error closing receiver:', err)
    }
  }
  receivers.length = 0
  if (sbClient) {
    try {
      await sbClient.close()
    } catch (err) {
      console.error('Error closing Service Bus client:', err)
    }
  }
  sbClient = null
  await closeSenders()
}

module.exports = { start, stop }
