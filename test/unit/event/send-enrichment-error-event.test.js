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
const { messageConfig } = require('../../../app/config')

const { PAYMENT_REJECTED } = require('../../../app/constants/events')
const { SOURCE } = require('../../../app/constants/source')

const { sendEnrichmentErrorEvent } = require('../../../app/event/send-enrichment-error-event')

let paymentRequest
let error

describe('V2 enrichment error event', () => {
  beforeEach(() => {
    paymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/payment-request')))
    error = {
      message: 'Cannot enrich'
    }

    messageConfig.eventsTopic = 'v2-events'
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should send event to V2 topic', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(MockEventPublisher.mock.calls[0][0]).toBe(messageConfig.eventsTopic)
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
    expect(mockPublishEvent.mock.calls[0][0].data).toMatchObject(paymentRequest)
  })
})
