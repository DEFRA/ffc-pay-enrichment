const { createKnexMock, createQueryBuilder } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['customers'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { SBI, VENDOR, TRADER } = require('../../../app/constants/reference-types')

const { saveUpdate } = require('../../../app/customer/save-update')

const FRN = 1234567890

describe('saveUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves()
  })

  test.each([
    [SBI, 123456789],
    [VENDOR, '100001'],
    [TRADER, '100002']
  ])('inserts a new %s customer with only the customer columns', async (referenceType, reference) => {
    mockDb.tables.customers.mockReturnValueOnce(createQueryBuilder().resolves(undefined))

    await saveUpdate({ [referenceType]: reference, frn: FRN })

    expect(mockDb.builder.insert).toHaveBeenCalledWith({ referenceType, reference, frn: FRN })
    expect(mockDb.builder.update).not.toHaveBeenCalled()
  })

  test('looks up the existing customer by reference as text', async () => {
    const lookup = createQueryBuilder().resolves(undefined)
    mockDb.tables.customers.mockReturnValueOnce(lookup)

    await saveUpdate({ sbi: 123456789, frn: FRN })

    expect(lookup.where).toHaveBeenCalledWith({ referenceType: SBI, reference: '123456789' })
    expect(lookup.first).toHaveBeenCalledTimes(1)
  })

  test('updates the FRN of an existing customer by id', async () => {
    mockDb.tables.customers.mockReturnValueOnce(createQueryBuilder().resolves({ id: 5, referenceType: SBI, reference: '123456789', frn: '1' }))

    await saveUpdate({ sbi: 123456789, frn: FRN })

    expect(mockDb.builder.where).toHaveBeenCalledWith({ id: 5 })
    expect(mockDb.builder.update).toHaveBeenCalledWith({ frn: FRN })
    expect(mockDb.builder.insert).not.toHaveBeenCalled()
  })

  test('saves each of sbi, vendor and trader in one update', async () => {
    mockDb.builder.resolves(undefined)

    await saveUpdate({ sbi: 123456789, vendor: '100001', trader: '100002', frn: FRN })

    expect(mockDb.builder.insert).toHaveBeenCalledTimes(3)
  })

  test('ignores keys that are not a reference type', async () => {
    await saveUpdate({ frn: FRN, other: 'value' })

    expect(mockDb.tables.customers).not.toHaveBeenCalled()
  })

  test('propagates a database failure', async () => {
    mockDb.builder.rejects(new Error('DB error'))

    await expect(saveUpdate({ sbi: 123456789, frn: FRN })).rejects.toThrow('DB error')
  })
})
