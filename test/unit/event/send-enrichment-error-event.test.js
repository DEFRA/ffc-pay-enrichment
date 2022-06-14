jest.mock('../../../app/event/raise-event')
const raiseEvent = require('../../../app/event/raise-event')
const sendEnrichErrorEvent = require('../../../app/event/send-enrichment-error-event')
const mockPaymentRequest = require('../../mock-payment-request')

let paymentRequest
let error

describe('Payment requests that cannot be enriched', () => {
  beforeEach(async () => {
    paymentRequest = mockPaymentRequest

    error = {
      message: 'Cannot enrich'
    }
  })

  afterEach(async () => {
    jest.resetAllMocks()
  })

  test('should call raiseEvent when a valid paymentRequest is received', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(raiseEvent).toHaveBeenCalled()
  })

  test('should use existing correlationId if provided', async () => {
    paymentRequest.correlationId = '591f9694-7851-47f7-98b3-b1c710c363d8'
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(raiseEvent.mock.calls[0][0].id).toBe(paymentRequest.correlationId)
  })

  test('should use generate correlationId if not provided', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(raiseEvent.mock.calls[0][0].id).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
  })

  test('should use map error message if provided', async () => {
    await sendEnrichErrorEvent(paymentRequest, error)
    expect(raiseEvent.mock.calls[0][0].message).toBe(error.message)
  })

  test('should throw error if no error provided', async () => {
    await expect(() => sendEnrichErrorEvent(paymentRequest)).rejects.toThrow()
  })
})
