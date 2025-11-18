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

const { FRN } = require('../../mocks/values/frn')
const { SOURCE_SYSTEM } = require('../../mocks/values/source-system')

const { VALIDATION } = require('../../../app/constants/errors')
const { ENRICHED, ACCEPTED, REJECTED } = require('../../../app/constants/types')

const { enrichPaymentRequest: mockEnrichPaymentRequest } = require('../../../app/enrichment')

const { processPaymentMessage } = require('../../../app/messaging/process-payment-message')

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

  const messageBase = { body: { frn: FRN } }

  test('completes valid message', async () => {
    await processPaymentMessage(messageBase, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(messageBase)
  })

  test.each([
    ['enriched message', 0, ENRICHED],
    ['accepted response', 1, ACCEPTED]
  ])('sends %s if valid', async (_, callIndex, expectedType) => {
    await processPaymentMessage(messageBase, receiver)
    expect(mockSendMessage.mock.calls[callIndex][0].type).toBe(expectedType)
  })

  test('dead letters and sends rejected response if request fails validation', async () => {
    mockErrorInProcessing(true)
    await processPaymentMessage(messageBase, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(messageBase)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
    expect(mockSendMessage.mock.calls[0][0].type).toBe(REJECTED)
  })

  test('does not dead letter or send response if non-validation error', async () => {
    mockErrorInProcessing()
    await processPaymentMessage(messageBase, receiver)
    expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
    expect(receiver.completeMessage).not.toHaveBeenCalled()
    expect(mockSendMessage).not.toHaveBeenCalled()
  })

  test.each([
    ['valid', false, 1],
    ['invalid', true, 0]
  ])(
    'sends response with source system metadata if %s',
    async (_, validationError, callIndex) => {
      if (validationError) mockErrorInProcessing(true)
      const message = { body: { frn: FRN, sourceSystem: SOURCE_SYSTEM } }
      await processPaymentMessage(message, receiver)
      expect(mockSendMessage.mock.calls[callIndex][0].subject).toBe(message.body.sourceSystem)
    }
  )

  test('sends response without source system metadata if fails validation and no source system', async () => {
    mockErrorInProcessing(true)
    const message = { body: { frn: FRN } }
    await processPaymentMessage(message, receiver)
    expect(mockSendMessage.mock.calls[0][0].subject).toBeUndefined()
  })
})
