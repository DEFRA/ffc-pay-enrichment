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
    const result = await db.customer.findAll({ where: { referenceType: SBI_TYPE, reference: SBI.toString(), frn: FRN } })
    expect(result).toHaveLength(1)
  })

  test('should save update for customer with vendor', async () => {
    await saveUpdate(customerUpdate)
    const result = await db.customer.findAll({ where: { referenceType: VENDOR_TYPE, reference: VENDOR, frn: FRN } })
    expect(result).toHaveLength(1)
  })

  test('should save update for customer with trader', async () => {
    await saveUpdate(customerUpdate)
    const result = await db.customer.findAll({ where: { referenceType: TRADER_TYPE, reference: TRADER, frn: FRN } })
    expect(result).toHaveLength(1)
  })

  test('should update frn for existing customer with sbi', async () => {
    await db.customer.create({ referenceType: SBI_TYPE, reference: SBI.toString(), frn: 123 })
    await saveUpdate(customerUpdate)
    const result = await db.customer.findAll({ where: { referenceType: SBI_TYPE, reference: SBI.toString(), frn: FRN } })
    expect(result).toHaveLength(1)
  })

  test('should update frn for existing customer with vendor', async () => {
    await db.customer.create({ referenceType: VENDOR_TYPE, reference: VENDOR, frn: 123 })
    await saveUpdate(customerUpdate)
    const result = await db.customer.findAll({ where: { referenceType: VENDOR_TYPE, reference: VENDOR, frn: FRN } })
    expect(result).toHaveLength(1)
  })

  test('should update frn for existing customer with trader', async () => {
    await db.customer.create({ referenceType: TRADER_TYPE, reference: TRADER, frn: 123 })
    await saveUpdate(customerUpdate)
    const result = await db.customer.findAll({ where: { referenceType: TRADER_TYPE, reference: TRADER, frn: FRN } })
    expect(result).toHaveLength(1)
  })

  test('should not save update for customer without sbi, trader or vendor', async () => {
    delete customerUpdate.sbi
    delete customerUpdate.vendor
    delete customerUpdate.trader
    await saveUpdate(customerUpdate)
    const result = await db.customer.findAll()
    expect(result).toHaveLength(0)
  })
})
