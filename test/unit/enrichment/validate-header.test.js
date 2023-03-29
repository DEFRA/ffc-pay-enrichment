jest.mock('../../../app/enrichment/schemas/header')
const {VALIDATION} = require('../../../app/constants/errors')
const mockSchema = require('../../../app/enrichment/schemas/header')

const validateHeader = require('../../../app/enrichment/validate-header')

describe('validate header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSchema.validate.mockReturnValue({ error: undefined })
  })

  test('should not throw error if schema validates successfully', () => {
    expect(() => validateHeader()).not.toThrow()
  })

  test('should throw error if schema validation fails', () => {
    mockSchema.validate.mockReturnValue({ error: 'validation failed' })
    expect(() => validateHeader()).toThrow()
  })

  test('should throw error with validation category', () => {
    mockSchema.validate.mockReturnValue({ error: 'validation failed' })
    try {
      validateHeader()
    } catch (error) {
      expect(error.category).toBe(VALIDATION)
    }
  })
})
