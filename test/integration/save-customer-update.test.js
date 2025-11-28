const { FRN } = require('../mocks/values/frn')
const { SBI } = require('../mocks/values/sbi')
const { VENDOR } = require('../mocks/values/vendor')
const { TRADER } = require('../mocks/values/trader')
const { SBI: SBI_TYPE, VENDOR: VENDOR_TYPE, TRADER: TRADER_TYPE } = require('../../app/constants/reference-types')

const db = require('../../app/data')
const { saveUpdate } = require('../../app/customer')

let customerUpdate

describe('saveUpdate', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })
    customerUpdate = { sbi: SBI, vendor: VENDOR, trader: TRADER, frn: FRN }
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  describe.each([
    ['sbi', SBI, SBI_TYPE],
    ['vendor', VENDOR, VENDOR_TYPE],
    ['trader', TRADER, TRADER_TYPE]
  ])('customer with %s', (key, value, type) => {
    test('saves new customer update', async () => {
      await saveUpdate(customerUpdate)
      const result = await db.customer.findAll({ where: { referenceType: type, reference: value.toString(), frn: FRN } })
      expect(result).toHaveLength(1)
    })

    test('updates FRN for existing customer', async () => {
      await db.customer.create({ referenceType: type, reference: value.toString(), frn: 123 })
      await saveUpdate(customerUpdate)
      const result = await db.customer.findAll({ where: { referenceType: type, reference: value.toString(), frn: FRN } })
      expect(result).toHaveLength(1)
    })
  })

  test('does not save update if no sbi, vendor, or trader', async () => {
    delete customerUpdate.sbi
    delete customerUpdate.vendor
    delete customerUpdate.trader
    await saveUpdate(customerUpdate)
    const result = await db.customer.findAll()
    expect(result).toHaveLength(0)
  })
})
