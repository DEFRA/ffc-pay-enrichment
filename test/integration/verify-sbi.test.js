jest.mock('ffc-pay-schemes', () => ({
  getSchemeIds: jest.fn(() => ({
    FC: 10,
    SFI: 1
  }))
}))

const { getSchemeIds } = require('ffc-pay-schemes')
const { SBI } = require('../../app/constants/reference-types')
const db = require('../../app/database')
const { truncate } = require('../helpers/truncate')

const { verifySBI } = require('../../app/enrichment/verify-sbi')

const { FRN } = require('../mocks/values/frn')
const { SBI: SBIValue } = require('../mocks/values/sbi')

const { FC, SFI } = getSchemeIds()

let paymentRequest

describe('verify SBI validity', () => {
  beforeAll(async () => {
    await truncate()
    await db.customers().insert({
      referenceType: SBI,
      reference: SBIValue.toString(),
      frn: FRN.toString()
    })
  })

  afterAll(async () => {
    await truncate()
    await db.close()
  })

  beforeEach(() => {
    paymentRequest = { ...require('../mocks/payment-requests/payment-request'), schemeId: FC, sbi: SBIValue, frn: FRN }
  })

  test('should not return error if SBI and FRN are valid', async () => {
    await expect(verifySBI(paymentRequest)).resolves.toBeNull()
  })

  test('should not return error if SBI and FRN are valid inside a transaction', async () => {
    await db.transaction(async (trx) => {
      await expect(verifySBI(paymentRequest, trx)).resolves.toBeNull()
    })
  })

  test('should return error if SBI does not map to FRN', async () => {
    paymentRequest.frn = 9876543210
    await expect(verifySBI(paymentRequest)).resolves.toBe('Header is invalid, SBI 123456789 does not map to FRN 9876543210 - expected FRN 1234567890')
  })

  test('should return error if customer is not found', async () => {
    paymentRequest.sbi = 999999999
    await expect(verifySBI(paymentRequest)).resolves.toBe('Header is invalid, SBI 999999999 does not map to FRN 1234567890 - no FRN record is held for this SBI')
  })

  test('should not check database if header does not have SBI', async () => {
    paymentRequest.sbi = undefined
    await expect(verifySBI(paymentRequest)).resolves.toBeNull()
  })

  test('should not check database if header schemeId is not FC', async () => {
    paymentRequest.schemeId = SFI
    await expect(verifySBI(paymentRequest)).resolves.toBeNull()
  })
})
