const Joi = require('joi')

const mqSchema = Joi.object({
  messageQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    appInsights: Joi.object()
  },
  paymentSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().allow('subscription'),
    numberOfReceivers: Joi.number().default(1)
  },
  processingTopic: {
    address: Joi.string()
  },
  responseTopic: {
    address: Joi.string()
  },
  eventTopic: {
    address: Joi.string()
  },
  eventsTopic: {
    address: Joi.string()
  }
})
const mqConfig = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === 'production',
    appInsights: process.env.NODE_ENV === 'production' ? require('applicationinsights') : undefined
  },
  paymentSubscription: {
    address: process.env.PAYMENT_SUBSCRIPTION_ADDRESS,
    topic: process.env.PAYMENT_TOPIC_ADDRESS,
    type: 'subscription',
    numberOfReceivers: process.env.PAYMENT_SUBSCRIPTION_RECEIVERS
  },
  processingTopic: {
    address: process.env.PROCESSING_TOPIC_ADDRESS
  },
  responseTopic: {
    address: process.env.RESPONSE_TOPIC_ADDRESS
  },
  eventTopic: {
    address: process.env.EVENT_TOPIC_ADDRESS
  },
  eventsTopic: {
    address: process.env.EVENTS_TOPIC_ADDRESS
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
const responseTopic = { ...mqResult.value.messageQueue, ...mqResult.value.responseTopic }
const eventTopic = { ...mqResult.value.messageQueue, ...mqResult.value.eventTopic }
const eventsTopic = { ...mqResult.value.messageQueue, ...mqResult.value.eventsTopic }

module.exports = {
  paymentSubscription,
  processingTopic,
  responseTopic,
  eventTopic,
  eventsTopic
}
