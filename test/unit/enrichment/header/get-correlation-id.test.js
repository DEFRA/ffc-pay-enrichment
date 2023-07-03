jest.mock('uuid')
const { v4: mockUuidv4 } = require('uuid')

const { CORRELATION_ID } = require('../../../mocks/values/correlation-id')

const { getCorrelationId } = require('../../../../app/enrichment/header/get-correlation-id')

describe('get correlation id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUuidv4.mockReturnValue(CORRELATION_ID)
  })

  test('should retain correlation id if already exists', () => {
    const result = getCorrelationId(CORRELATION_ID)
    expect(result).toBe(CORRELATION_ID)
  })

  test('should create uuid correlation id if undefined', () => {
    const result = getCorrelationId(undefined)
    expect(result).toBe(CORRELATION_ID)
  })

  test('should create uuid correlation id if null', () => {
    const result = getCorrelationId(null)
    expect(result).toBe(CORRELATION_ID)
  })
})
