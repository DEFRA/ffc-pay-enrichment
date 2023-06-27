jest.mock('../../../app/enrichment/get-es-fund-code')
const { getESFundCode: mockGetESFundCode } = require('../../../app/enrichment/get-es-fund-code')

jest.mock('../../../app/enrichment/get-es-marketing-year')
const { getESMarketingYear: mockGetESMarketingYear } = require('../../../app/enrichment/get-es-marketing-year')

jest.mock('../../../app/enrichment/get-es-account-code')
const { getESAccountCode: mockGetESAccountCode } = require('../../../app/enrichment/get-es-account-code')

const { DRD05 } = require('../../../app/constants/fund-codes')
const { SOS710 } = require('../../../app/constants/account-codes')

const { enrichESInvoiceLine } = require('../../../app/enrichment/enrich-es-invoice-line')

let invoiceLine

describe('enrich ES invoice line', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetESFundCode.mockReturnValue(DRD05)
    mockGetESMarketingYear.mockReturnValue(2020)
    mockGetESAccountCode.mockReturnValue(SOS710)

    invoiceLine = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/es-invoice-line')))
  })

  test('should get ES fund code', async () => {
    enrichESInvoiceLine(invoiceLine)
    expect(mockGetESFundCode).toHaveBeenCalledWith(invoiceLine.companyCode)
  })

  test('should get ES marketing year', async () => {
    enrichESInvoiceLine(invoiceLine)
    expect(mockGetESMarketingYear).toHaveBeenCalledWith(invoiceLine.subAccountCode)
  })

  test('should get ES account code', async () => {
    const originalAccountCode = invoiceLine.accountCode
    enrichESInvoiceLine(invoiceLine)
    expect(mockGetESAccountCode).toHaveBeenCalledWith(originalAccountCode)
  })
})
