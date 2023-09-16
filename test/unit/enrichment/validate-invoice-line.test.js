jest.mock('../../../app/enrichment/schemas/invoice-line')
const mockSchema = require('../../../app/enrichment/schemas/invoice-line')

const invoiceLine = require('../../mocks/payment-requests/invoice-line')

const { SFI } = require('../../../app/constants/schemes')
const { VALIDATION } = require('../../../app/constants/errors')

const { validateInvoiceLine } = require('../../../app/enrichment/validate-invoice-line')

describe('validate header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSchema.validate.mockReturnValue({ error: undefined })
  })

  test('should not throw error if schema validates successfully', () => {
    expect(() => validateInvoiceLine(invoiceLine, SFI)).not.toThrow()
  })

  test('should throw error if schema validation fails', () => {
    mockSchema.validate.mockReturnValue({ error: 'validation failed' })
    expect(() => validateInvoiceLine(invoiceLine, SFI)).toThrow()
  })

  test('should throw error with validation category', () => {
    mockSchema.validate.mockReturnValue({ error: 'validation failed' })
    try {
      validateInvoiceLine(invoiceLine, SFI)
    } catch (error) {
      expect(error.category).toBe(VALIDATION)
    }
  })
})
