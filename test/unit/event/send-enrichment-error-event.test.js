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
const { PAYMENT_REJECTED } = require('../../../app/constants/events')
const { SOURCE } = require('../../../app/constants/source')
const sendEnrichmentErrorEvent = require('../../../app/event/send-enrichment-error-event')

let paymentRequest
let error

beforeEach(() => {
  paymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/payment-request')))
  error = {
    message: 'Cannot enrich'
  }
  config.useV1Events = true
  config.useV2Events = true
  config.eventTopic = 'v1-events'
  config.eventsTopic = 'v2-events'
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('V1 enrichment error event', () => {
  test('should send V1 event if V1 events enabled', async () => {
    config.useV1Events = true
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent).toHaveBeenCalled()
  })

  test('should not send V1 event if V1 events disabled', async () => {
    config.useV1Events = false
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent).not.toHaveBeenCalled()
  })

  test('should send event to V1 topic', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(MockPublishEvent.mock.calls[0][0]).toBe(config.eventTopic)
  })

  test('should raise an event with payment request correlation Id as Id if exists', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.id).toBe(paymentRequest.correlationId)
  })

  test('should generate a new uuid as Id if payment request does not have correlation Id', async () => {
    paymentRequest.correlationId = undefined
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  })

  test('should raise payment-request-enrichment-error event name', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].name).toBe('payment-request-enrichment-error')
  })

  test('should raise error status event', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.status).toBe('error')
  })

  test('should raise error event type', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.action.type).toBe('error')
  })

  test('should include error message in event', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.action.message).toBe(error.message)
  })

  test('should include payment request in event', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.action.data.paymentRequest).toEqual(paymentRequest)
  })

  test('should throw error if no error provided', async () => {
    await expect(() => sendEnrichmentErrorEvent(paymentRequest)).rejects.toThrow()
  })
})

describe('V2 enrichment error event', () => {
  test('should send V2 event if V2 events enabled', async () => {
    config.useV2Events = true
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockPublishEvent).toHaveBeenCalled()
  })

  test('should not send V2 event if V2 events disabled', async () => {
    config.useV2Events = false
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockPublishEvent).not.toHaveBeenCalled()
  })

  test('should send event to V2 topic', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(MockEventPublisher.mock.calls[0][0]).toBe(config.eventsTopic)
  })

  test('should raise an event with enrichment source', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockPublishEvent.mock.calls[0][0].source).toBe(SOURCE)
  })

  test('should raise rejected payment event type', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockPublishEvent.mock.calls[0][0].type).toBe(PAYMENT_REJECTED)
  })

  test('should include error message in event data', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockPublishEvent.mock.calls[0][0].data.message).toBe(error.message)
  })

  test('should include payment request in event data', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(mockPublishEvent.mock.calls[0][0].data.paymentRequest).toEqual(paymentRequest)
  })
})
