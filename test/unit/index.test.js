const { enrichmentConfig } = require('../../app/config')

jest.mock('../../app/messaging')
const { start: mockStartMessaging } = require('../../app/messaging')

jest.mock('../../app/server')
const { start: mockStartServer } = require('../../app/server')

const startApp = require('../../app')

describe('app start', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test.each([
    [true, 1, false],
    [false, 0, true]
  ])(
    'processingActive=%p: starts server, messagingCalls=%i, consoleInfoCalled=%p',
    async (active, expectedMessagingCalls, consoleInfoCalled) => {
      enrichmentConfig.processingActive = active
      const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})

      await startApp()

      expect(mockStartServer).toHaveBeenCalled()
      expect(mockStartMessaging).toHaveBeenCalledTimes(expectedMessagingCalls)

      if (consoleInfoCalled) {
        expect(consoleInfoSpy).toHaveBeenCalledWith(
          expect.stringContaining('Processing capabilities are currently not enabled in this environment')
        )
      } else {
        expect(consoleInfoSpy).not.toHaveBeenCalled()
      }

      consoleInfoSpy.mockRestore()
    }
  )
})
