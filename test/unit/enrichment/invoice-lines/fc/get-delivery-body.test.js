const { FC00, FC99 } = require('../../../../../app/constants/delivery-bodies')
const { _028Q031Q, _028E031Q } = require('../../../../../app/constants/standard-codes')
const { getDeliveryBody } = require('../../../../../app/enrichment/invoice-lines/fc/get-delivery-body')

describe('get FC delivery body', () => {
  test.each([
    [_028Q031Q, FC99],
    [_028E031Q, FC99],
    ['123456', FC00]
  ])('should return %s for standard code %s', (standardCode, expected) => {
    const result = getDeliveryBody(standardCode)
    expect(result).toBe(expected)
  })
})
