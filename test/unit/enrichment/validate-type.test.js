const { VALIDATION } = require('../../../app/constants/errors')

const paymentRequest = require('../../mocks/payment-requests/payment-request')

const { validateType } = require('../../../app/enrichment/validate-type')

describe('validate type', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should not throw error if validates successfully', () => {
    expect(() => validateType(paymentRequest)).not.toThrow()
  })

  test('should throw error if payment request is not passed', () => {
    expect(() => validateType()).toThrow()
  })

  test('should throw error if payment request is a string', () => {
    expect(() => validateType('not an object')).toThrow()
  })

  test('should throw error if payment request is an array', () => {
    expect(() => validateType([])).toThrow()
  })

  test('should throw error if payment request is null', () => {
    expect(() => validateType(null)).toThrow()
  })

  test('should throw error if payment request is undefined', () => {
    expect(() => validateType(undefined)).toThrow()
  })

  test('should throw error if payment request is a number', () => {
    expect(() => validateType(123)).toThrow()
  })

  test('should throw error if payment request is a boolean', () => {
    expect(() => validateType(true)).toThrow()
  })

  test('should throw error with validation category', () => {
    try {
      validateType()
    } catch (error) {
      expect(error.category).toBe(VALIDATION)
    }
  })
})
