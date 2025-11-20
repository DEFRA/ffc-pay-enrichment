const { getFundCode } = require('../../../../app/enrichment/invoice-lines/get-fund-code')

const defaultFundCode = 'A999'

describe('get fund code', () => {
  test.each([
    [{ fundCode: 'A123' }, defaultFundCode, 'A123'],
    [{}, defaultFundCode, defaultFundCode]
  ])('returns correct fund code for invoiceLine %o with default %s', (invoiceLine, defaultCode, expected) => {
    expect(getFundCode(invoiceLine, defaultCode)).toBe(expected)
  })
})
