const { SBI } = require('../../../app/constants/reference-types')
const { FC, SFI } = require('../../../app/constants/schemes')
const db = require('../../../app/data')

const { verifySBI } = require('../../../app/enrichment/verify-sbi')

const paymentRequest = require('../../mocks/payment-requests/payment-request')
const { FRN } = require('../../mocks/values/frn')
const { SBI: SBIValue } = require('../../mocks/values/sbi')

describe('verify SBI validity', () => {
  const transaction = {}

  beforeAll(async () => {
    await db.customer.create({
      referenceType: SBI,
      reference: SBIValue.toString(),
      frn: FRN.toString()
    })
  })

  afterAll(async () => {
    await db.customer.destroy({
      where: {
        referenceType: SBI,
        reference: SBIValue.toString()
      }
    })
    await db.sequelize.close()
  })

  beforeEach(() => {
    paymentRequest.schemeId = FC
    paymentRequest.frn = FRN
  })

  test('should not return error if SBI and FRN are valid', async () => {
    await expect(verifySBI(paymentRequest, transaction)).resolves.toBeNull()
  })

  test('should return error if SBI does not map to FRN', async () => {
    paymentRequest.frn = 9876543210
    await expect(verifySBI(paymentRequest, transaction)).resolves.toBe('Header is invalid, SBI 123456789 does not map to FRN 9876543210 - expected FRN 9876543210')
  })

  test('should return error if customer is not found', async () => {
    paymentRequest.sbi = 999999999
    await expect(verifySBI(paymentRequest, transaction)).resolves.toBe('Header is invalid, SBI 999999999 does not map to FRN 1234567890 - no FRN record is held for this SBI')
  })

  test('should not check database if header does not have SBI', async () => {
    paymentRequest.sbi = undefined
    await expect(verifySBI(paymentRequest, transaction)).resolves.toBeNull()
  })

  test('should not check database if header schemeId is not FC', async () => {
    paymentRequest.schemeId = SFI
    await expect(verifySBI(paymentRequest, transaction)).resolves.toBeNull()
  })
})
