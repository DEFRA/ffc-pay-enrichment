jest.mock('../../../app/messaging/service-bus')
jest.mock('../../../app/messaging/diagnostics', () => ({
  createDiagnosticsHandler: jest.fn(name => jest.fn())
}))

const messaging = require('../../../app/messaging')
const { createServiceBusClient, createReceiver, subscribeReceiver, closeSenders } = require('../../../app/messaging/service-bus')
const { createDiagnosticsHandler } = require('../../../app/messaging/diagnostics')
const { messageConfig } = require('../../../app/config')

describe('Messaging module', () => {
  let sbClientCloseMock
  let receiverCloseMock
  let sbClientMock

  beforeEach(() => {
    receiverCloseMock = jest.fn()
    sbClientCloseMock = jest.fn()
    sbClientMock = {
      close: sbClientCloseMock
    }

    createServiceBusClient.mockReturnValue(sbClientMock)
    createReceiver.mockReturnValue({
      close: receiverCloseMock
    })
    createDiagnosticsHandler.mockImplementation(name => jest.fn())
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('start creates Service Bus client and the correct number of receivers and subscribes them', async () => {
    await messaging.start()

    expect(createServiceBusClient).toHaveBeenCalledTimes(1)
    expect(createServiceBusClient).toHaveBeenCalledWith(messageConfig.paymentSubscription)
    expect(createReceiver).toHaveBeenCalledTimes(messageConfig.paymentSubscription.numberOfReceivers + 1)

    for (let i = 0; i < messageConfig.paymentSubscription.numberOfReceivers; i++) {
      expect(createReceiver).toHaveBeenNthCalledWith(i + 1, sbClientMock, messageConfig.paymentSubscription)
      expect(createDiagnosticsHandler).toHaveBeenCalledWith(`payment-receiver-${i + 1}`)
      expect(subscribeReceiver).toHaveBeenCalled()
    }

    expect(createReceiver).toHaveBeenLastCalledWith(sbClientMock, messageConfig.customerSubscription)
    expect(createDiagnosticsHandler).toHaveBeenCalledWith('customer-receiver')
  })

  test('stop closes all receivers, Service Bus client and senders', async () => {
    await messaging.start()
    await messaging.stop()

    const totalReceivers = messageConfig.paymentSubscription.numberOfReceivers + 1
    expect(receiverCloseMock).toHaveBeenCalledTimes(totalReceivers)
    expect(sbClientCloseMock).toHaveBeenCalledTimes(1)
    expect(closeSenders).toHaveBeenCalledTimes(1)
  })
})
