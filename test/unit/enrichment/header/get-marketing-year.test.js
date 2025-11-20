jest.mock('../../../../app/enrichment/invoice-lines/fc/get-marketing-year')
const { getMarketingYear: mockGetMarketingYearFromInvoiceLine } = require('../../../../app/enrichment/invoice-lines/fc/get-marketing-year')

const { STANDARD_CODE } = require('../../../mocks/values/standard-code')
const { FC } = require('../../../../app/constants/schemes')
const { getMarketingYear } = require('../../../../app/enrichment/header/get-marketing-year')

let paymentRequest

describe('get marketing year', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetMarketingYearFromInvoiceLine.mockReturnValue(2021)
    paymentRequest = {
      invoiceLines: [{ standardCode: STANDARD_CODE }]
    }
  })

  describe('Non-FC schemes', () => {
    test('returns marketing year if it exists', () => {
      paymentRequest.marketingYear = 2020
      expect(getMarketingYear(paymentRequest)).toBe(2020)
    })

    test('returns undefined if marketing year does not exist', () => {
      expect(getMarketingYear(paymentRequest)).toBeUndefined()
    })
  })

  describe('FC scheme', () => {
    beforeEach(() => {
      paymentRequest.schemeId = FC
    })

    test('calls getMarketingYearFromInvoiceLine with standard code', () => {
      paymentRequest.marketingYear = 2020
      getMarketingYear(paymentRequest)
      expect(mockGetMarketingYearFromInvoiceLine).toHaveBeenCalledWith(STANDARD_CODE)
    })

    test('returns marketing year from invoice line', () => {
      paymentRequest.marketingYear = 2020
      expect(getMarketingYear(paymentRequest)).toBe(2021)
    })

    test.each([
      ['no standard code', () => delete paymentRequest.invoiceLines[0].standardCode],
      ['no invoice lines', () => delete paymentRequest.invoiceLines]
    ])('does not throw if %s', (_, modify) => {
      modify()
      expect(() => getMarketingYear(paymentRequest)).not.toThrow()
    })
  })
})
