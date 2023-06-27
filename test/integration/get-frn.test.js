const { FRN } = require('../mocks/values/frn')
const { SBI } = require('../mocks/values/sbi')

const db = require('../../app/data')

const { getFrn } = require('../../app/enrichment/get-frn')

let customer
let paymentRequest

describe('get frn', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    customer = {
      referenceType: 'sbi',
      reference: SBI,
      frn: FRN
    }

    paymentRequest = {
      sbi: SBI
    }

    await db.customer.create(customer)
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should return frn for payment request with sbi', async () => {
    const result = await getFrn(paymentRequest)
    expect(result).toBe(FRN)
  })

  test('should return undefined if no match for sbi', async () => {
    paymentRequest.sbi = 123
    const result = await getFrn(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('should return undefined if no SBI provided', async () => {
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
