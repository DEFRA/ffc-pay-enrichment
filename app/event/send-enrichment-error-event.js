const { EventPublisher } = require('ffc-pay-event-publisher')
const config = require('../config')
const raiseEvent = require('./raise-event')
const { v4: uuidv4 } = require('uuid')

const sendEnrichmentErrorEvent = async (paymentRequest, error) => {
  if (config.useV1Events) {
    await sendV1EnrichmentErrorEvent(paymentRequest, error)
  }
  if (config.useV2Events) {
    await sendV2EnrichmentErrorEvent(paymentRequest, error)
  }
}

const sendV1EnrichmentErrorEvent = async (paymentRequest, error) => {
  const correlationId = paymentRequest.correlationId ?? uuidv4()
  const event = {
    id: correlationId,
    name: 'payment-request-enrichment-error',
    type: 'error',
    message: error.message,
    data: { paymentRequest }
  }
  await raiseEvent(event, 'error')
}

const sendV2EnrichmentErrorEvent = async (paymentRequest, error) => {
  const event = {
    source: 'ffc-pay-enrichment',
    type: 'uk.gov.defra.ffc.pay.warning.payment.rejected',
    data: {
      message: error.message,
      paymentRequest
    }
  }
  const eventPublisher = new EventPublisher(config.eventsTopic)
  await eventPublisher.publishEvent(event)
}

module.exports = sendEnrichmentErrorEvent
