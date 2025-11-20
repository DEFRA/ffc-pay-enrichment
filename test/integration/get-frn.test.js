const { FRN } = require('../mocks/values/frn')
const { SBI } = require('../mocks/values/sbi')
const { VENDOR } = require('../mocks/values/vendor')
const { TRADER } = require('../mocks/values/trader')
const { SBI: SBI_TYPE, VENDOR: VENDOR_TYPE, TRADER: TRADER_TYPE } = require('../../app/constants/reference-types')

const db = require('../../app/data')
const { getFrn } = require('../../app/enrichment/header/get-frn')

let paymentRequest

describe('getFrn', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    await db.customer.bulkCreate([
      { referenceType: SBI_TYPE, reference: SBI, frn: FRN },
      { referenceType: VENDOR_TYPE, reference: VENDOR, frn: FRN },
      { referenceType: TRADER_TYPE, reference: TRADER, frn: FRN }
    ])

    paymentRequest = {}
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('returns existing FRN if already present', async () => {
    paymentRequest.frn = FRN
    await expect(getFrn(paymentRequest)).resolves.toBe(FRN)
  })

  describe.each([
    ['sbi', SBI],
    ['vendor', VENDOR],
    ['trader', TRADER]
  ])('lookup by %s', (key, value) => {
    test('returns FRN for exact match', async () => {
      paymentRequest[key] = value
      await expect(getFrn(paymentRequest)).resolves.toBe(FRN)
    })

    test('returns undefined if no match', async () => {
      paymentRequest[key] = 12345
      await expect(getFrn(paymentRequest)).resolves.toBeUndefined()
    })
  })

  test.each([undefined, null, {}, [], '', false, true, 0, 1])(
    'returns undefined for invalid input %p',
    async (input) => {
      await expect(getFrn(input)).resolves.toBeUndefined()
    }
  )
})
