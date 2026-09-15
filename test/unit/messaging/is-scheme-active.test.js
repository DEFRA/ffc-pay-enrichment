jest.mock('ffc-pay-schemes', () => ({
  getSourceSystems: jest.fn(() => ({
    VET_VISITS: 'AHWR',
    FPTT: 'FPTT',
    WMP: 'WMP'
  }))
}))

jest.mock('../../../app/config')
const { getSourceSystems } = require('ffc-pay-schemes')
const { messageConfig } = require('../../../app/config')

const { VET_VISITS, FPTT, WMP } = getSourceSystems()
const { isSchemeActive } = require('../../../app/messaging/is-scheme-active')

describe('isSchemeActive', () => {
  beforeEach(() => {
    messageConfig.activeSchemes = { ahwr: true, fptt: true, wmp: true }
  })

  afterEach(() => jest.clearAllMocks())

  describe('AHWR / VET_VISITS', () => {
    test('should return true when AHWR scheme is active', () => {
      messageConfig.activeSchemes.ahwr = true
      expect(isSchemeActive(VET_VISITS)).toBe(true)
    })

    test('should return false when AHWR scheme is inactive', () => {
      messageConfig.activeSchemes.ahwr = false
      expect(isSchemeActive(VET_VISITS)).toBe(false)
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

  describe('WMP', () => {
    test('should return true when WMP scheme is active', () => {
      messageConfig.activeSchemes.wmp = true
      expect(isSchemeActive(WMP)).toBe(true)
    })

    test('should return false when WMP scheme is inactive', () => {
      messageConfig.activeSchemes.wmp = false
      expect(isSchemeActive(WMP)).toBe(false)
    })
  })

  describe('unknown source system', () => {
    test('should return true for an unspecified source system', () => {
      expect(isSchemeActive('UNKNOWN_SCHEME')).toBe(true)
    })
  })
})
