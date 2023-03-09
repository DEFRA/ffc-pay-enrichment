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

beforeEach(() => {
  paymentRequest = mockPaymentRequest
  error = {
    message: 'Cannot enrich'
  }
  config.useV1Events = true
  config.useV2Events = true
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('V1 enrichment error event', () => {
  test('should send V1 event if V1 events enabled', async () => {
    config.useV1Events = true
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent).toHaveBeenCalled()
  })

  test('should not send V1 event if V1 events disabled', async () => {
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
    expect(mockSendEvent.mock.calls[0][0].properties.id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  })

  test('should raise payment-request-enrichment-error event name', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].name).toBe('payment-request-enrichment-error')
  })

  test('should raise error status event', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.status).toBe('error')
  })

  test('should raise error event type', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.action.type).toBe('error')
  })

  test('should include error message in event', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.action.message).toBe(error.message)
  })

  test('should include payment request in event', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockSendEvent.mock.calls[0][0].properties.action.data.paymentRequest).toEqual(paymentRequest)
  })

  test('should throw error if no error provided', async () => {
    await expect(() => sendEnrichErrorEvent(paymentRequest)).rejects.toThrow()
  })
})

describe('V2 enrichment error event', () => {
  test('should send V2 event if V2 events enabled', async () => {
    config.useV2Events = true
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockPublishEvent).toHaveBeenCalled()
  })

  test('should not send V2 event if V2 events disabled', async () => {
    config.useV2Events = false
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockPublishEvent).not.toHaveBeenCalled()
  })

  test('should raise an event when an invalid paymentRequest is received', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockPublishEvent).toHaveBeenCalled()
  })

  test('should raise an event with enrichment source', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockPublishEvent.mock.calls[0][0].source).toBe('ffc-pay-enrichment')
  })

  test('should raise rejected payment event type', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockPublishEvent.mock.calls[0][0].type).toBe('uk.gov.defra.ffc.pay.warning.payment.rejected')
  })

  test('should include error message in event data', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockPublishEvent.mock.calls[0][0].data.message).toBe(error.message)
  })

  test('should include payment request in event data', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(mockPublishEvent.mock.calls[0][0].data.paymentRequest).toEqual(paymentRequest)
  })
})
