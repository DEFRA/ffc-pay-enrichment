const mqConfig = {
  host: process.env.MESSAGE_QUEUE_HOST,
  username: process.env.MESSAGE_QUEUE_USER,
  password: process.env.MESSAGE_QUEUE_PASSWORD,
  useCredentialChain: false,
  appInsights: undefined,
  type: 'subscription',
  retries: 3
}

const config = {
  processingSubscription: {
    ...mqConfig,
    address: process.env.PROCESSING_SUBSCRIPTION_ADDRESS,
    topic: process.env.PROCESSING_TOPIC_ADDRESS
  },
  paymentTopic: {
    ...mqConfig,
    address: process.env.PAYMENT_TOPIC_ADDRESS,
  },
  paymentSubscription: {
    ...mqConfig,
    address: process.env.PAYMENT_SUBSCRIPTION_ADDRESS,
    topic: process.env.PAYMENT_TOPIC_ADDRESS
  }
}

module.exports = config
