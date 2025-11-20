const mockPublishEvent = jest.fn()

const MockEventPublisher = jest.fn(() => ({
  publishEvent: mockPublishEvent
}))

jest.mock('ffc-pay-event-publisher', () => ({ EventPublisher: MockEventPublisher }))
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
    error = { message: 'Cannot enrich' }
    messageConfig.eventsTopic = 'v2-events'
  })

  afterEach(() => jest.clearAllMocks())

  test('should send event to V2 topic', async () => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
    expect(MockEventPublisher).toHaveBeenCalledWith(messageConfig.eventsTopic)
  })

  test.each([
    ['source', () => SOURCE],
    ['type', () => PAYMENT_REJECTED],
    ['data.message', () => error.message],
    ['data', () => paymentRequest]
  ])('should set %s correctly in event', async (propertyPath, expectedFn) => {
    await sendEnrichmentErrorEvent(paymentRequest, error)
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
