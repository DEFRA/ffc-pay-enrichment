const mockSendEvent = jest.fn()
const mockPublishEvent = jest.fn()
jest.mock('ffc-pay-event-publisher', () => {
  return {
    PublishEvent: jest.fn().mockImplementation(() => {
      return {
        sendEvent: mockSendEvent
      }
    }),
    EventPublisher: jest.fn().mockImplementation(() => {
      return {
        publishEvent: mockPublishEvent
      }
    })
  }
})
jest.mock('../../../app/config')
const config = require('../../../app/config')
const sendEnrichErrorEvent = require('../../../app/event/send-enrichment-error-event')
const mockPaymentRequest = require('../../mock-payment-request')

let paymentRequest
let error

describe('V1 enrichment error event', () => {
  beforeEach(() => {
    paymentRequest = mockPaymentRequest
    error = {
      message: 'Cannot enrich'
    }
    config.useV1Events = true
    config.useV2Events = false
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should sent event if V1 events enabled', async () => {
    config.useV1Events = true
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent).toHaveBeenCalled()
  })

  test('should not sent event if V1 events disabled', async () => {
    config.useV1Events = false
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent).not.toHaveBeenCalled()
  })

  test('should raise an event when an invalid paymentRequest is received', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent).toHaveBeenCalled()
  })

  test('should raise an event with payment request correlation Id as Id if exists', async () => {
    paymentRequest.correlationId = '591f9694-7851-47f7-98b3-b1c710c363d8'
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.id).toBe(paymentRequest.correlationId)
  })

  test('should generate a new uuid as Id if payment request does not have correlation Id', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  })

  test('should use map error message if provided', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.action.message).toBe(error.message)
  })

  test('should throw error if no error provided', async () => {
    await expect(() => sendEnrichErrorEvent(paymentRequest)).rejects.toThrow()
  })
})
