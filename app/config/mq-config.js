const joi = require('joi')

const mqSchema = joi.object({
  messageQueue: {
    host: joi.string(),
    username: joi.string(),
    password: joi.string(),
    useCredentialChain: joi.bool().default(false),
    type: joi.string().default('subscription'),
    appInsights: joi.object()
  },
  paymentSubscription: {
    name: joi.string(),
    address: joi.string(),
    topic: joi.string(),
    numberOfReceivers: joi.number().default(1)
  },
  processingTopic: {
    name: joi.string(),
    address: joi.string()
  }
})
const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === 'production',
    type: 'subscription',
    appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined
  },
  paymentSubscription: {
    name: process.env.PAYMENT_SUBSCRIPTION_NAME,
    address: process.env.PAYMENT_SUBSCRIPTION_ADDRESS,
    topic: process.env.PAYMENT_TOPIC_ADDRESS,
    numberOfReceivers: process.env.PAYMENT_SUBSCRIPTION_RECEIVERS
  },
  processingTopic: {
    name: process.env.PROCESSING_TOPIC_NAME,
    address: process.env.PROCESSING_TOPIC_ADDRESS
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const paymentSubscription = { ...mqResult.value.messageQueue, ...mqResult.value.paymentSubscription }
const processingTopic = { ...mqResult.value.messageQueue, ...mqResult.value.processingTopic }

console.log(paymentSubscription.address)
console.log(processingTopic.address)

module.exports = {
  paymentSubscription,
  processingTopic
}
