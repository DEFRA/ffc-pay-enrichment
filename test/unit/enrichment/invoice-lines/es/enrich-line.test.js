jest.mock('../../../../../app/enrichment/invoice-lines/es/get-fund-code')
const { getFundCode: mockGetFundCode } = require('../../../../../app/enrichment/invoice-lines/es/get-fund-code')

jest.mock('../../../../../app/enrichment/invoice-lines/es/get-marketing-year')
const { getMarketingYear: mockGetMarketingYear } = require('../../../../../app/enrichment/invoice-lines/es/get-marketing-year')

jest.mock('../../../../../app/enrichment/invoice-lines/es/get-account-code')
const { getAccountCode: mockGetAccountCode } = require('../../../../../app/enrichment/invoice-lines/es/get-account-code')

const { DRD05 } = require('../../../../../app/constants/fund-codes')
const { SOS710 } = require('../../../../../app/constants/account-codes')

const { enrichInvoiceLine } = require('../../../../../app/enrichment/invoice-lines/es/enrich-invoice-line')

let invoiceLine

describe('enrich ES invoice line', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetFundCode.mockReturnValue(DRD05)
    mockGetMarketingYear.mockReturnValue(2020)
    mockGetAccountCode.mockReturnValue(SOS710)

    invoiceLine = JSON.parse(JSON.stringify(require('../../../../mocks/payment-requests/invoice-line')))
  })

  test('should get ES fund code', async () => {
    enrichInvoiceLine(invoiceLine)
    expect(mockGetFundCode).toHaveBeenCalledWith(invoiceLine.companyCode)
  })

  test('should get ES marketing year', async () => {
    enrichInvoiceLine(invoiceLine)
    expect(mockGetMarketingYear).toHaveBeenCalledWith(invoiceLine.subAccountCode)
  })

  test('should get ES account code', async () => {
    const originalAccountCode = invoiceLine.accountCode
    enrichInvoiceLine(invoiceLine)
    expect(mockGetAccountCode).toHaveBeenCalledWith(originalAccountCode)
  })
})
