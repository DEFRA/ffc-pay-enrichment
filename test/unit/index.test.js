const { enrichmentConfig } = require('../../app/config')

jest.mock('../../app/messaging')
const { start: mockStartMessaging } = require('../../app/messaging')

const startApp = require('../../app')

describe('app start', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('starts messaging when active is true', async () => {
    enrichmentConfig.processingActive = true
    await startApp()
    expect(mockStartMessaging).toHaveBeenCalledTimes(1)
  })

  test('does not start messaging if active is false', async () => {
    enrichmentConfig.processingActive = false
    await startApp()
    expect(mockStartMessaging).toHaveBeenCalledTimes(0)
  })

  test('does not log console.info when active is true', async () => {
    enrichmentConfig.processingActive = true
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    await startApp()
    expect(consoleInfoSpy).not.toHaveBeenCalled()
    consoleInfoSpy.mockRestore()
  })

  test('logs console.info when active is false', async () => {
    enrichmentConfig.processingActive = false
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    await startApp()
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining('Processing capabilities are currently not enabled in this environment')
    )
    consoleInfoSpy.mockRestore()
  })
})
