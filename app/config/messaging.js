const Joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  messageQueue: {
    host: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    useCredentialChain: Joi.bool().default(false),
    appInsights: Joi.object(),
    managedIdentityClientId: Joi.string().optional()
  },
  paymentSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().allow('subscription'),
    numberOfReceivers: Joi.number().default(1)
  },
  customerSubscription: {
    address: Joi.string(),
    topic: Joi.string(),
    type: Joi.string().allow('subscription')
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

const config = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === PRODUCTION,
    appInsights: process.env.NODE_ENV === PRODUCTION ? require('applicationinsights') : undefined,
    managedIdentityClientId: process.env.AZURE_CLIENT_ID
  },
  paymentSubscription: {
    address: process.env.PAYMENT_SUBSCRIPTION_ADDRESS,
    topic: process.env.PAYMENT_TOPIC_ADDRESS,
    type: 'subscription',
    numberOfReceivers: process.env.PAYMENT_SUBSCRIPTION_RECEIVERS
  },
  customerSubscription: {
    address: process.env.CUSTOMER_SUBSCRIPTION_ADDRESS,
    topic: process.env.CUSTOMER_TOPIC_ADDRESS,
    type: 'subscription'
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

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The messaging config is invalid. ${result.error.message}`)
}

const paymentSubscription = { ...result.value.messageQueue, ...result.value.paymentSubscription }
const customerSubscription = { ...result.value.messageQueue, ...result.value.customerSubscription }
const processingTopic = { ...result.value.messageQueue, ...result.value.processingTopic }
const responseTopic = { ...result.value.messageQueue, ...result.value.responseTopic }
const eventTopic = { ...result.value.messageQueue, ...result.value.eventTopic }
const eventsTopic = { ...result.value.messageQueue, ...result.value.eventsTopic }

module.exports = {
  paymentSubscription,
  customerSubscription,
  processingTopic,
  responseTopic,
  eventTopic,
  eventsTopic
}
