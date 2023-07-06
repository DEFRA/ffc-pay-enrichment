const { FC00, FC99 } = require('../../../../../app/constants/delivery-bodies')
const { _028Q031Q, _028E031Q } = require('../../../../../app/constants/standard-codes')

const { getDeliveryBody } = require('../../../../../app/enrichment/invoice-lines/fc/get-delivery-body')

describe('get FC delivery body', () => {
  test('should return FC99 if standard code is 028Q031Q', () => {
    const result = getDeliveryBody(_028Q031Q)
    expect(result).toBe(FC99)
  })

  test('should return FC99 if standard code is 028E031Q', () => {
    const result = getDeliveryBody(_028E031Q)
    expect(result).toBe(FC99)
  })

  test('should return FC00 if standard code is not 028Q031Q or 028E031Q', () => {
    const result = getDeliveryBody('123456')
    expect(result).toBe(FC00)
  })
})
