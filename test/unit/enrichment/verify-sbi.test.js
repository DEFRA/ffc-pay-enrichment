const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['customers'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

jest.mock('ffc-pay-schemes', () => ({
  getSchemeIds: jest.fn(() => ({
    FC: 10,
    SFI: 1
  }))
}))

const { getSchemeIds } = require('ffc-pay-schemes')
const { SBI } = require('../../../app/constants/reference-types')

const { verifySBI } = require('../../../app/enrichment/verify-sbi')

const { FRN } = require('../../mocks/values/frn')
const { SBI: SBIValue } = require('../../mocks/values/sbi')

const { FC, SFI } = getSchemeIds()

let header

describe('verify SBI validity', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves({ id: 1, referenceType: SBI, reference: SBIValue.toString(), frn: FRN.toString() })
    header = { schemeId: FC, sbi: SBIValue, frn: FRN }
  })

  test('queries customers by SBI reference type and reference', async () => {
    await verifySBI(header)

    expect(mockDb.builder.where).toHaveBeenCalledWith({ referenceType: SBI, reference: SBIValue.toString() })
    expect(mockDb.builder.first).toHaveBeenCalledTimes(1)
  })

  test('queries against the pool when no transaction is provided', async () => {
    await verifySBI(header)
    expect(mockDb.tables.customers).toHaveBeenCalledWith(undefined)
  })

  test('queries against the pool when transaction is null', async () => {
    await verifySBI(header, null)
    expect(mockDb.tables.customers).toHaveBeenCalledWith(undefined)
  })

  test('queries against the transaction when provided', async () => {
    await verifySBI(header, mockDb.trx)
    expect(mockDb.tables.customers).toHaveBeenCalledWith(mockDb.trx)
  })

  test('should not return error if SBI and FRN are valid', async () => {
    await expect(verifySBI(header)).resolves.toBeNull()
  })

  test('should return error if SBI does not map to FRN', async () => {
    header.frn = 9876543210
    await expect(verifySBI(header)).resolves.toBe('Header is invalid, SBI 123456789 does not map to FRN 9876543210 - expected FRN 1234567890')
  })

  test('should return error if customer is not found', async () => {
    mockDb.builder.resolves(undefined)
    header.sbi = 999999999
    await expect(verifySBI(header)).resolves.toBe('Header is invalid, SBI 999999999 does not map to FRN 1234567890 - no FRN record is held for this SBI')
  })

  test('should not check database if header does not have SBI', async () => {
    header.sbi = undefined
    await expect(verifySBI(header)).resolves.toBeNull()
    expect(mockDb.tables.customers).not.toHaveBeenCalled()
  })

  test('should not check database if header schemeId is not FC', async () => {
    header.schemeId = SFI
    await expect(verifySBI(header)).resolves.toBeNull()
    expect(mockDb.tables.customers).not.toHaveBeenCalled()
  })

  test('propagates a database failure', async () => {
    mockDb.builder.rejects(new Error('DB error'))
    await expect(verifySBI(header)).rejects.toThrow('DB error')
  })
})
