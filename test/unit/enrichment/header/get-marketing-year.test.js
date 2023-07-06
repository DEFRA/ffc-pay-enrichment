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
      invoiceLines: [{
        standardCode: STANDARD_CODE
      }]
    }
  })

  test('should return marketing year if marketing year exists and scheme is not FC', async () => {
    paymentRequest.marketingYear = 2020
    const result = getMarketingYear(paymentRequest)
    expect(result).toBe(paymentRequest.marketingYear)
  })

  test('should return undefined if marketing year does not exist and scheme is not FC', async () => {
    const result = getMarketingYear(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('should return marketing year from invoice line if scheme is FC', async () => {
    paymentRequest.marketingYear = 2020
    paymentRequest.schemeId = FC
    getMarketingYear(paymentRequest)
    expect(mockGetMarketingYearFromInvoiceLine).toHaveBeenCalledWith(paymentRequest.invoiceLines[0].standardCode)
  })

  test('should return marketing year from invoice line if scheme is FC', async () => {
    paymentRequest.marketingYear = 2020
    paymentRequest.schemeId = FC
    const result = getMarketingYear(paymentRequest)
    expect(result).toBe(2021)
  })

  test('should not error scheme is FC and payment request does not have a standard code', async () => {
    paymentRequest.marketingYear = 2020
    paymentRequest.schemeId = FC
    delete paymentRequest.invoiceLines[0].standardCode
    getMarketingYear(paymentRequest)
  })

  test('should not error scheme is FC and payment request does not have invoice lines', async () => {
    paymentRequest.marketingYear = 2020
    paymentRequest.schemeId = FC
    delete paymentRequest.invoiceLines
    getMarketingYear(paymentRequest)
  })
})
