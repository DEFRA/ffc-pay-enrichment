const mockPublishEvent = jest.fn()

const MockEventPublisher = jest.fn().mockImplementation(() => {
  return {
    publishEvent: mockPublishEvent
  }
})

jest.mock('ffc-pay-event-publisher', () => {
  return {
    EventPublisher: MockEventPublisher
  }
})

jest.mock('../../../app/config')
const { enrichmentConfig, messageConfig } = require('../../../app/config')

const { PAYMENT_ENRICHED } = require('../../../app/constants/events')
const { SOURCE } = require('../../../app/constants/source')

const { sendEnrichmentEvent } = require('../../../app/event/send-enrichment-event')

let paymentRequestComparison

describe('V2 enrichment event', () => {
  beforeEach(() => {
    const paymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/payment-request')))
    paymentRequestComparison = { paymentRequest, originalPaymentRequest: paymentRequest }

    enrichmentConfig.useV2Events = true
    messageConfig.eventsTopic = 'v2-events'
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should send V2 event if V2 events enabled', async () => {
    enrichmentConfig.useV2Events = true
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent).toHaveBeenCalled()
  })

  test('should not send V2 event if V2 events disabled', async () => {
    enrichmentConfig.useV2Events = false
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent).not.toHaveBeenCalled()
  })

  test('should send event to V2 topic', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(MockEventPublisher.mock.calls[0][0]).toBe(messageConfig.eventsTopic)
  })

  test('should raise an event with enrichment source', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent.mock.calls[0][0].source).toBe(SOURCE)
  })

  test('should raise rejected payment event type', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent.mock.calls[0][0].type).toBe(PAYMENT_ENRICHED)
  })

  test('should include payment request in event data', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(mockPublishEvent.mock.calls[0][0].data).toEqual(paymentRequestComparison.paymentRequest)
  })
})
