const mockPublishEvent = jest.fn()

const MockEventPublisher = jest.fn(() => ({ publishEvent: mockPublishEvent }))

jest.mock('ffc-pay-event-publisher', () => ({ EventPublisher: MockEventPublisher }))
jest.mock('../../../app/config')
const { messageConfig } = require('../../../app/config')

const { PAYMENT_ENRICHED } = require('../../../app/constants/events')
const { SOURCE } = require('../../../app/constants/source')
const { sendEnrichmentEvent } = require('../../../app/event/send-enrichment-event')

let paymentRequestComparison

describe('V2 enrichment event', () => {
  beforeEach(() => {
    const paymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/payment-request')))
    paymentRequestComparison = { paymentRequest, originalPaymentRequest: paymentRequest }
    messageConfig.eventsTopic = 'v2-events'
  })

  afterEach(() => jest.clearAllMocks())

  test('should send event to V2 topic', async () => {
    await sendEnrichmentEvent(paymentRequestComparison)
    expect(MockEventPublisher).toHaveBeenCalledWith(messageConfig.eventsTopic)
  })

  test.each([
    ['source', () => SOURCE],
    ['type', () => PAYMENT_ENRICHED],
    ['data', () => paymentRequestComparison.paymentRequest]
  ])('should set %s correctly in event', async (propertyPath, expectedFn) => {
    await sendEnrichmentEvent(paymentRequestComparison)
    const event = mockPublishEvent.mock.calls[0][0]
    const value = propertyPath.split('.').reduce((obj, key) => obj[key], event)
    const expected = expectedFn()
    if (typeof expected === 'object') {
      expect(value).toMatchObject(expected)
    } else {
      expect(value).toBe(expected)
    }
  })
})
