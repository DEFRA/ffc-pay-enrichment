const { getMarketingYear } = require('../../../../app/enrichment/invoice-lines/get-marketing-year')

describe('get marketing year', () => {
  test.each([
    [{ marketingYear: -1 }, 2023, undefined],
    [{ marketingYear: 2020 }, 2023, 2020],
    [{}, 2023, 2023]
  ])('returns correct marketing year for invoiceLine %o with default %s', (invoiceLine, defaultYear, expected) => {
    expect(getMarketingYear(invoiceLine, defaultYear)).toBe(expected)
  })
})
