jest.mock('../../../app/enrichment/schemas/header')
jest.mock('../../../app/enrichment/verify-sbi')

const mockSchema = require('../../../app/enrichment/schemas/header')
const { verifySBI } = require('../../../app/enrichment/verify-sbi')

const paymentRequest = require('../../mocks/payment-requests/payment-request')

const { VALIDATION } = require('../../../app/constants/errors')

const { validateHeader } = require('../../../app/enrichment/validate-header')

describe('validate header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSchema.validate.mockReturnValue({ error: undefined })
    verifySBI.mockResolvedValue(null)
  })

  test('should not throw error if schema validates successfully and verifySBI returns null', async () => {
    await expect(validateHeader(paymentRequest)).resolves.not.toThrow()
  })

  test('should throw error if schema validation fails', async () => {
    mockSchema.validate.mockReturnValue({ error: { message: 'validation failed' } })
    await expect(validateHeader(paymentRequest)).rejects.toThrow('Header is invalid, validation failed')
  })

  test('should throw error if verifySBI returns an error', async () => {
    verifySBI.mockResolvedValue('Header is invalid, SBI 123456789 does not map to FRN 1234567890 - expected FRN 9876543210')
    await expect(validateHeader(paymentRequest)).rejects.toThrow('Header is invalid, SBI 123456789 does not map to FRN 1234567890 - expected FRN 9876543210')
  })

  test('should throw error with validation category if schema validation fails', async () => {
    mockSchema.validate.mockReturnValue({ error: { message: 'validation failed' } })
    try {
      await validateHeader(paymentRequest)
    } catch (error) {
      expect(error.category).toBe(VALIDATION)
    }
  })

  test('should throw error with validation category if verifySBI returns an error', async () => {
    verifySBI.mockResolvedValue('Header is invalid, SBI 123456789 does not map to FRN 1234567890 - expected FRN 9876543210')
    try {
      await validateHeader(paymentRequest)
    } catch (error) {
      expect(error.category).toBe(VALIDATION)
    }
  })
})
