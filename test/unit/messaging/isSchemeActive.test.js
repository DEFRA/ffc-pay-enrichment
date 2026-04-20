jest.mock('../../../app/config')
const { messageConfig } = require('../../../app/config')

const { AHWR, FPTT } = require('../../../app/constants/source-systems')
const { isSchemeActive } = require('../../../app/messaging/isSchemeActive')

describe('isSchemeActive', () => {
  beforeEach(() => {
    messageConfig.activeSchemes = { ahwr: true, fptt: true }
  })

  afterEach(() => jest.clearAllMocks())

  describe('AHWR', () => {
    test('should return true when AHWR scheme is active', () => {
      messageConfig.activeSchemes.ahwr = true
      expect(isSchemeActive(AHWR)).toBe(true)
    })

    test('should return false when AHWR scheme is inactive', () => {
      messageConfig.activeSchemes.ahwr = false
      expect(isSchemeActive(AHWR)).toBe(false)
    })
  })

  describe('FPTT', () => {
    test('should return true when FPTT scheme is active', () => {
      messageConfig.activeSchemes.fptt = true
      expect(isSchemeActive(FPTT)).toBe(true)
    })

    test('should return false when FPTT scheme is inactive', () => {
      messageConfig.activeSchemes.fptt = false
      expect(isSchemeActive(FPTT)).toBe(false)
    })
  })

  describe('unknown source system', () => {
    test('should return true for an unspecified source system', () => {
      expect(isSchemeActive('UNKNOWN_SCHEME')).toBe(true)
    })
  })
})
