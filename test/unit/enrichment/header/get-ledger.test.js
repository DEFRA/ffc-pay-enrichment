const { AP } = require('../../../../app/constants/ledgers')

const { getLedger } = require('../../../../app/enrichment/header/get-ledger')

describe('get ledger', () => {
  test('should return existing ledger if ledger is defined', () => {
    const result = getLedger(AP)
    expect(result).toBe(AP)
  })

  test('should return AP if ledger is undefined', () => {
    const result = getLedger(undefined)
    expect(result).toBe(AP)
  })

  test('should return AP if ledger is null', () => {
    const result = getLedger(null)
    expect(result).toBe(AP)
  })
})
