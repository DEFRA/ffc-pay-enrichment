const { VALIDATION } = require('../../../app/constants/errors')
const { ENRICHED, ACCEPTED, REJECTED } = require('../../../app/constants/types')
const { FRN } = require('../../mocks/values/frn')
const { SOURCE_SYSTEM } = require('../../mocks/values/source-system')

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
jest.mock('ffc-pay-event-publisher', () => {
  return {
    PublishEvent: jest.fn().mockImplementation(() => {
      return {
        sendEvent: jest.fn()
      }
    }),
    EventPublisher: jest.fn().mockImplementation(() => {
      return {
        publishEvent: jest.fn()
      }
    })
  }
})
jest.mock('../../../app/data')
jest.mock('../../../app/enrichment')
const mockEnrichPaymentRequest = require('../../../app/enrichment')

const processPaymentMessage = require('../../../app/messaging/process-payment-message')

let receiver

const mockErrorInProcessing = (validation = false) => {
  mockEnrichPaymentRequest.mockImplementation(() => {
    const error = new Error()
    error.category = validation ? VALIDATION : undefined
    throw error
  })
}

describe('process payment message', () => {
  beforeEach(() => {
    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
    mockEnrichPaymentRequest.mockReset()
  })

  test('completes valid message', async () => {
    const message = {
      body: {
        frn: FRN
      }
    }
    await processPaymentMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('sends enriched message if valid', async () => {
    const message = {
      body: {
        frn: FRN
      }
    }
    await processPaymentMessage(message, receiver)
    expect(mockSendMessage.mock.calls[0][0].type).toBe(ENRICHED)
  })

  test('sends response message if valid', async () => {
    const message = {
      body: {
        frn: FRN
      }
    }
    await processPaymentMessage(message, receiver)
    expect(mockSendMessage.mock.calls[1][0].type).toBe(ACCEPTED)
  })

  test('dead letters and sends rejected response if request fails validation', async () => {
    mockErrorInProcessing(true)
    const message = {
      body: {
        frn: FRN
      }
    }
    await processPaymentMessage(message, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
    expect(receiver.completeMessage).not.toHaveBeenCalledWith(message)
    expect(mockSendMessage.mock.calls[0][0].type).toBe(REJECTED)
  })

  test('does not dead letter or send response if non-validation error', async () => {
    mockErrorInProcessing()
    const message = {
      body: {
        frn: FRN
      }
    }
    await processPaymentMessage(message, receiver)
    expect(receiver.deadLetterMessage).not.toHaveBeenCalledWith(message)
    expect(receiver.completeMessage).not.toHaveBeenCalledWith(message)
    expect(mockSendMessage).not.toHaveBeenCalled()
  })

  test('sends response with source system metadata if valid', async () => {
    const message = {
      body: {
        frn: FRN,
        sourceSystem: SOURCE_SYSTEM
      }
    }
    await processPaymentMessage(message, receiver)
    expect(mockSendMessage.mock.calls[1][0].subject).toBe(message.body.sourceSystem)
  })

  test('sends response with source system metadata if invalid', async () => {
    mockErrorInProcessing(true)
    const message = {
      body: {
        frn: FRN,
        sourceSystem: SOURCE_SYSTEM
      }
    }
    await processPaymentMessage(message, receiver)
    expect(mockSendMessage.mock.calls[0][0].subject).toBe(message.body.sourceSystem)
  })

  test('sends response without source system metadata if fails validation and no source system', async () => {
    mockErrorInProcessing(true)
    const message = {
      body: {
        frn: FRN
      }
    }
    await processPaymentMessage(message, receiver)
    expect(mockSendMessage.mock.calls[0][0].subject).toBeUndefined()
  })
})
