const { FRN } = require('../mocks/values/frn')
const { SBI } = require('../mocks/values/sbi')
const { VENDOR } = require('../mocks/values/vendor')
const { TRADER } = require('../mocks/values/trader')
const { SBI: SBI_TYPE } = require('../../app/constants/reference-types')
const { VENDOR: VENDOR_TYPE } = require('../../app/constants/reference-types')
const { TRADER: TRADER_TYPE } = require('../../app/constants/reference-types')

const db = require('../../app/data')

const { getFrn } = require('../../app/enrichment/get-frn')

let paymentRequest

describe('get frn', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    await db.customer.bulkCreate([{
      referenceType: SBI_TYPE,
      reference: SBI,
      frn: FRN
    }, {
      referenceType: VENDOR_TYPE,
      reference: VENDOR,
      frn: FRN
    }, {
      referenceType: TRADER_TYPE,
      reference: TRADER,
      frn: FRN
    }])

    paymentRequest = {}
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should return frn for payment request with sbi', async () => {
    paymentRequest.sbi = SBI
    const result = await getFrn(paymentRequest)
    expect(result).toBe(FRN)
  })

  test('should return undefined if no match for sbi', async () => {
    paymentRequest.sbi = 123
    const result = await getFrn(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('should return frn for payment request with vendor', async () => {
    paymentRequest.vendor = VENDOR
    const result = await getFrn(paymentRequest)
    expect(result).toBe(FRN)
  })

  test('should return undefined if no match for vendor', async () => {
    paymentRequest.vendor = '123'
    const result = await getFrn(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('should return frn for payment request with trader', async () => {
    paymentRequest.trader = TRADER
    const result = await getFrn(paymentRequest)
    expect(result).toBe(FRN)
  })

  test('should return undefined if no identifier provided', async () => {
    const result = await getFrn()
    expect(result).toBeUndefined()
  })

  test('should return undefined if undefined provided', async () => {
    const result = await getFrn(undefined)
    expect(result).toBeUndefined()
  })

  test('should return undefined if null provided', async () => {
    const result = await getFrn(null)
    expect(result).toBeUndefined()
  })

  test('should return undefined if object provided', async () => {
    const result = await getFrn({})
    expect(result).toBeUndefined()
  })

  test('should return undefined if array provided', async () => {
    const result = await getFrn([])
    expect(result).toBeUndefined()
  })

  test('should return undefined if empty string provided', async () => {
    const result = await getFrn('')
    expect(result).toBeUndefined()
  })

  test('should return undefined if false provided', async () => {
    const result = await getFrn(false)
    expect(result).toBeUndefined()
  })

  test('should return undefined if true provided', async () => {
    const result = await getFrn(true)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 1 provided', async () => {
    const result = await getFrn(1)
    expect(result).toBeUndefined()
  })

  test('should return undefined if 0 provided', async () => {
    const result = await getFrn(0)
    expect(result).toBeUndefined()
  })
})
