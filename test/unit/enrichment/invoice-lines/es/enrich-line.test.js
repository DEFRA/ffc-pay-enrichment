jest.mock('../../../../../app/enrichment/invoice-lines/es/get-fund-code')
jest.mock('../../../../../app/enrichment/invoice-lines/es/get-marketing-year')
jest.mock('../../../../../app/enrichment/invoice-lines/es/get-account-code')

const { getFundCode: mockGetFundCode } = require('../../../../../app/enrichment/invoice-lines/es/get-fund-code')
const { getMarketingYear: mockGetMarketingYear } = require('../../../../../app/enrichment/invoice-lines/es/get-marketing-year')
const { getAccountCode: mockGetAccountCode } = require('../../../../../app/enrichment/invoice-lines/es/get-account-code')

const { DRD05 } = require('../../../../../app/constants/fund-codes')
const { SOS710 } = require('../../../../../app/constants/account-codes')

const { enrichInvoiceLine } = require('../../../../../app/enrichment/invoice-lines/es/enrich-invoice-line')

describe('enrich ES invoice line', () => {
  let invoiceLine

  beforeEach(() => {
    jest.clearAllMocks()

    mockGetFundCode.mockReturnValue(DRD05)
    mockGetMarketingYear.mockReturnValue(2020)
    mockGetAccountCode.mockReturnValue(SOS710)

    invoiceLine = JSON.parse(JSON.stringify(require('../../../../mocks/payment-requests/invoice-line')))
  })

  test.each([
    ['fund code', () => mockGetFundCode, 'companyCode'],
    ['marketing year', () => mockGetMarketingYear, 'subAccountCode'],
    ['account code', () => mockGetAccountCode, 'accountCode']
  ])('should get ES %s', (_, mockFnGetter, key) => {
    const mockFn = mockFnGetter()
    const originalValue = invoiceLine[key]
    enrichInvoiceLine(invoiceLine)
    expect(mockFn).toHaveBeenCalledWith(originalValue)
  })
})
