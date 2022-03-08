jest.mock('ffc-messaging')
const mockSendMessage = jest.fn()
jest.mock('ffc-messaging', () => {
  return {
    MessageSender: jest.fn().mockImplementation(() => {
      return {
        sendMessage: mockSendMessage,
        closeConnection: jest.fn()
      }
    })
  }
})
jest.mock('../../../app/data')
jest.mock('../../../app/enrichment')
const mockEnrichPaymentRequest = require('../../../app/enrichment')
const { VALIDATION } = require('../../../app/errors')
const processPaymentMessage = require('../../../app/messaging/process-payment-message')
let receiver

describe('process payment message', () => {
  beforeEach(() => {
    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('completes valid message', async () => {
    const message = {
      body: {
        frn: 1234567890
      }
    }
    await processPaymentMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('sends enriched message if valid', async () => {
    const message = {
      body: {
        frn: 1234567890
      }
    }
    await processPaymentMessage(message, receiver)
    expect(mockSendMessage).toHaveBeenCalled()
  })

  test('dead letters if request fails validation', async () => {
    mockEnrichPaymentRequest.mockImplementation(() => {
      const error = new Error()
      error.category = VALIDATION
      throw error
    })
    const message = {
      body: {
        frn: 1234567890
      }
    }
    await processPaymentMessage(message, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
    expect(receiver.completeMessage).not.toHaveBeenCalledWith(message)
  })

  test('dead letters if request fails validation', async () => {
    mockEnrichPaymentRequest.mockImplementation(() => {
      throw new Error()
    })
    const message = {
      body: {
        frn: 1234567890
      }
    }
    await processPaymentMessage(message, receiver)
    expect(receiver.deadLetterMessage).not.toHaveBeenCalledWith(message)
    expect(receiver.completeMessage).not.toHaveBeenCalledWith(message)
  })
})
