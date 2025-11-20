const { VALIDATION } = require('../../../app/constants/errors')
const paymentRequest = require('../../mocks/payment-requests/payment-request')
const { validateType } = require('../../../app/enrichment/validate-type')

describe('validateType', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('does not throw if a valid payment request is provided', () => {
    expect(() => validateType(paymentRequest)).not.toThrow()
  })

  test.each([undefined, null, 'string', [], 123, true])(
    'throws if payment request is invalid (%p)',
    (invalidInput) => {
      expect(() => validateType(invalidInput)).toThrow()
    }
  )

  test('throws error includes VALIDATION category', () => {
    try {
      validateType()
    } catch (error) {
      expect(error.category).toBe(VALIDATION)
    }
  })
})
