const { VALIDATION } = require('../../../app/constants/errors')

jest.mock('../../../app/enrichment/schemas/invoice-line')
const mockSchema = require('../../../app/enrichment/schemas/invoice-line')

const validateInvoiceLine = require('../../../app/enrichment/validate-invoice-line')

describe('validate header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSchema.validate.mockReturnValue({ error: undefined })
  })

  test('should not throw error if schema validates successfully', () => {
    expect(() => validateInvoiceLine()).not.toThrow()
  })

  test('should throw error if schema validation fails', () => {
    mockSchema.validate.mockReturnValue({ error: 'validation failed' })
    expect(() => validateInvoiceLine()).toThrow()
  })

  test('should throw error with validation category', () => {
    mockSchema.validate.mockReturnValue({ error: 'validation failed' })
    try {
      validateInvoiceLine()
    } catch (error) {
      expect(error.category).toBe(VALIDATION)
    }
  })
})
