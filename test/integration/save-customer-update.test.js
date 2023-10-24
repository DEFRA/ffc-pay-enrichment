const { FRN } = require('../mocks/values/frn')
const { SBI } = require('../mocks/values/sbi')
const { VENDOR } = require('../mocks/values/vendor')
const { TRADER } = require('../mocks/values/trader')
const { SBI: SBI_TYPE, VENDOR: VENDOR_TYPE, TRADER: TRADER_TYPE } = require('../../app/constants/reference-types')

const db = require('../../app/data')

const { saveUpdate } = require('../../app/customer')

let customerUpdate

describe('get frn', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    customerUpdate = {
      sbi: SBI,
      vendor: VENDOR,
      trader: TRADER,
      frn: FRN
    }
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should save update for customer with sbi', async () => {
    await saveUpdate(customerUpdate)
    const result = await db.customer.findAll({ where: { referenceType: SBI_TYPE, reference: SBI } })
    expect(result).toHaveLength(1)
    expect(result[0].frn).toBe(FRN)
  })
})
