jest.mock('uuid')
const { v4: mockUuidv4 } = require('uuid')

const { CORRELATION_ID } = require('../../../mocks/values/correlation-id')
const { getCorrelationId } = require('../../../../app/enrichment/header/get-correlation-id')

describe('getCorrelationId', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUuidv4.mockReturnValue(CORRELATION_ID)
  })

  test.each([
    ['existing correlation id', CORRELATION_ID, CORRELATION_ID],
    ['undefined correlation id', undefined, CORRELATION_ID],
    ['null correlation id', null, CORRELATION_ID]
  ])('should return correct correlation id when %s', (_, input, expected) => {
    expect(getCorrelationId(input)).toBe(expected)
  })
})
