const mockSendEvent = jest.fn()
const mockPublishEvent = jest.fn()
const MockPublishEvent = jest.fn().mockImplementation(() => {
  return {
    sendEvent: mockSendEvent
  }
})
const MockEventPublisher = jest.fn().mockImplementation(() => {
  return {
    publishEvent: mockPublishEvent
  }
})
jest.mock('ffc-pay-event-publisher', () => {
  return {
    PublishEvent: MockPublishEvent,
    EventPublisher: MockEventPublisher
  }
})
jest.mock('../../../app/config')
const config = require('../../../app/config')
const { ENRICHED } = require('../../../app/constants/events')
const { SOURCE } = require('../../../app/constants/source')
const sendEnrichmentEvent = require('../../../app/event/send-enrichment-event')

let paymentRequestComparison

beforeEach(() => {
  const paymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-request')))
  paymentRequestComparison = { paymentRequest: paymentRequest, originalPaymentRequest: paymentRequest }
  config.useV1Events = true
  config.useV2Events = true
  config.eventTopic = 'v1-events'
  config.eventsTopic = 'v2-events'
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('V1 enrichment event', () => {
  test('should send V1 event if V1 events enabled', async () => {
    config.useV1Events = true
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent).toHaveBeenCalled()
  })

  test('should not send V1 event if V1 events disabled', async () => {
    config.useV1Events = false
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent).not.toHaveBeenCalled()
  })

  test('should send event to V1 topic', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(MockPublishEvent.mock.calls[0][0]).toBe(config.eventTopic)
  })

  test('should raise an event with payment request correlation Id as Id if exists', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent.mock.calls[0][0].properties.id).toBe(paymentRequestComparison.paymentRequest.correlationId)
  })

  test('should raise payment-request-enrichment event name', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent.mock.calls[0][0].name).toBe('payment-request-enrichment')
  })

  test('should raise success status event', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent.mock.calls[0][0].properties.status).toBe('success')
  })

  test('should raise info event type', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent.mock.calls[0][0].properties.action.type).toBe('info')
  })

  test('should raise payment request enriched message', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent.mock.calls[0][0].properties.action.message).toBe('Payment request enriched')
  })

  test('should include original payment request in event data', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent.mock.calls[0][0].properties.action.data.originalPaymentRequest).toEqual(paymentRequestComparison.originalPaymentRequest)
  })

  test('should include enriched payment request in event data', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockSendEvent.mock.calls[0][0].properties.action.data.paymentRequest).toEqual(paymentRequestComparison.paymentRequest)
  })
})

describe('V2 enrichment event', () => {
  test('should send V2 event if V2 events enabled', async () => {
    config.useV2Events = true
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent).toHaveBeenCalled()
  })

  test('should not send V2 event if V2 events disabled', async () => {
    config.useV2Events = false
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent).not.toHaveBeenCalled()
  })

  test('should send event to V2 topic', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(MockEventPublisher.mock.calls[0][0]).toBe(config.eventsTopic)
  })

  test('should raise an event with enrichment source', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent.mock.calls[0][0].source).toBe(SOURCE)
  })

  test('should raise rejected payment event type', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent.mock.calls[0][0].type).toBe(ENRICHED)
  })

  test('should include payment request in event data', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent.mock.calls[0][0].data).toEqual(paymentRequestComparison.paymentRequest)
  })
})
