const { GBP } = require('../../../../app/constants/currency')
const { getCurrency } = require('../../../../app/enrichment/header/get-currency')

describe('getCurrency', () => {
  test.each([
    ['existing currency', GBP, GBP],
    ['undefined currency', undefined, GBP],
    ['null currency', null, GBP]
  ])('should return correct currency when %s', (_, input, expected) => {
    expect(getCurrency(input)).toBe(expected)
  })
})
