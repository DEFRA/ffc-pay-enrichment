const { AP } = require('../../../../app/constants/ledgers')
const { getLedger } = require('../../../../app/enrichment/header/get-ledger')

describe('get ledger', () => {
  test.each([
    ['existing ledger defined', AP, AP],
    ['undefined ledger', undefined, AP],
    ['null ledger', null, AP]
  ])('should return correct ledger when %s', (_, input, expected) => {
    expect(getLedger(input)).toBe(expected)
  })
})
