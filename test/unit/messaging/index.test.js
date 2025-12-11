jest.mock('ffc-messaging')
jest.mock('../../../app/messaging/diagnostics', () => ({
  createDiagnosticsHandler: jest.fn(name => jest.fn())
}))

const { MessageReceiver } = require('ffc-messaging')
const messaging = require('../../../app/messaging')
const { createDiagnosticsHandler } = require('../../../app/messaging/diagnostics')
const { messageConfig } = require('../../../app/config')

describe('Messaging module', () => {
  let subscribeMock, closeConnectionMock

  beforeEach(() => {
    subscribeMock = jest.fn()
    closeConnectionMock = jest.fn()
    MessageReceiver.mockImplementation((config, action) => ({
      config,
      action,
      subscribe: subscribeMock,
      closeConnection: closeConnectionMock
    }))
    createDiagnosticsHandler.mockImplementation(name => jest.fn())
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('start creates the correct number of payment receivers and subscribes them', async () => {
    await messaging.start()

    expect(MessageReceiver).toHaveBeenCalledTimes(messageConfig.paymentSubscription.numberOfReceivers + 1)

    for (let i = 0; i < messageConfig.paymentSubscription.numberOfReceivers; i++) {
      expect(createDiagnosticsHandler).toHaveBeenCalledWith(`payment-receiver-${i + 1}`)
      expect(subscribeMock).toHaveBeenCalled()
    }

    expect(createDiagnosticsHandler).toHaveBeenCalledWith('customer-receiver')
  })

  test('stop calls closeConnection on all receivers', async () => {
    await messaging.start()
    await messaging.stop()

    const totalReceivers = messageConfig.paymentSubscription.numberOfReceivers + 1
    expect(closeConnectionMock).toHaveBeenCalledTimes(totalReceivers)
  })
})
