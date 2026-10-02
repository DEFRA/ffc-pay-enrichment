const { createKnexMock, createQueryBuilder } = require('../../../helpers/mock-knex')

const mockDb = createKnexMock(['customers'])

jest.mock('../../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { SBI, VENDOR, TRADER } = require('../../../../app/constants/reference-types')

const { getFrn } = require('../../../../app/enrichment/header/get-frn')

const customer = { id: 1, frn: '1234567890' }

describe('getFrn', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves(customer)
  })

  test('returns existing FRN without querying', async () => {
    await expect(getFrn({ frn: 1234567890, sbi: 123456789 })).resolves.toBe(1234567890)
    expect(mockDb.tables.customers).not.toHaveBeenCalled()
  })

  test('returns undefined without querying if no sbi, vendor or trader', async () => {
    await expect(getFrn({})).resolves.toBeUndefined()
    expect(mockDb.tables.customers).not.toHaveBeenCalled()
  })

  test('looks up by sbi reference as text', async () => {
    await expect(getFrn({ sbi: 123456789 })).resolves.toBe(1234567890)
    expect(mockDb.builder.where).toHaveBeenCalledWith({ referenceType: SBI, reference: '123456789' })
    expect(mockDb.builder.first).toHaveBeenCalledTimes(1)
  })

  test.each([
    ['vendor', VENDOR, 'G100001C'],
    ['trader', TRADER, 'G100001C']
  ])('looks up by %s matching either the full or stripped reference', async (key, type, value) => {
    await expect(getFrn({ [key]: value })).resolves.toBe(1234567890)
    expect(mockDb.builder.where).toHaveBeenCalledWith('referenceType', type)
    expect(mockDb.builder.where).toHaveBeenCalledWith(expect.any(Function))
    expect(mockDb.builder.where).toHaveBeenCalledWith('reference', value)
    expect(mockDb.builder.orWhere).toHaveBeenCalledWith('reference', '100001')
  })

  test('falls through sbi, vendor and trader until a match is found', async () => {
    mockDb.tables.customers.mockReturnValueOnce(createQueryBuilder().resolves(undefined))
    await expect(getFrn({ sbi: 123456789, vendor: '100001', trader: '100001' })).resolves.toBe(1234567890)
    expect(mockDb.tables.customers).toHaveBeenCalledTimes(2)
  })

  test('returns undefined if no customer matches any reference', async () => {
    mockDb.builder.resolves(undefined)
    await expect(getFrn({ sbi: 123456789, vendor: '100001', trader: '100001' })).resolves.toBeUndefined()
    expect(mockDb.tables.customers).toHaveBeenCalledTimes(3)
  })

  test('queries against the pool when no transaction is provided', async () => {
    await getFrn({ sbi: 123456789 })
    expect(mockDb.tables.customers).toHaveBeenCalledWith(undefined)
  })

  test.each(['sbi', 'vendor', 'trader'])('queries %s against the transaction when provided', async (key) => {
    await getFrn({ [key]: '100001' }, mockDb.trx)
    expect(mockDb.tables.customers).toHaveBeenCalledWith(mockDb.trx)
  })

  test('returns undefined if the query fails', async () => {
    mockDb.builder.rejects(new Error('DB error'))
    await expect(getFrn({ sbi: 123456789 })).resolves.toBeUndefined()
  })
})
