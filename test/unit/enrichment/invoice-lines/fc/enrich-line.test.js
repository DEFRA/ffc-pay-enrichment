jest.mock('../../../../../app/enrichment/invoice-lines/fc/get-fund-code')
const { getFundCode: mockGetFundCode } = require('../../../../../app/enrichment/invoice-lines/fc/get-fund-code')

jest.mock('../../../../../app/enrichment/invoice-lines/fc/get-marketing-year')
const { getMarketingYear: mockGetMarketingYear } = require('../../../../../app/enrichment/invoice-lines/fc/get-marketing-year')

jest.mock('../../../../../app/enrichment/invoice-lines/fc/get-account-code')
const { getAccountCode: mockGetAccountCode } = require('../../../../../app/enrichment/invoice-lines/fc/get-account-code')

jest.mock('../../../../../app/enrichment/invoice-lines/fc/get-delivery-body')
const { getDeliveryBody: mockGetDeliveryBody } = require('../../../../../app/enrichment/invoice-lines/fc/get-delivery-body')

const { DRD05 } = require('../../../../../app/constants/fund-codes')
const { SOS710 } = require('../../../../../app/constants/account-codes')
const { FC00 } = require('../../../../../app/constants/delivery-bodies')

const { enrichInvoiceLine } = require('../../../../../app/enrichment/invoice-lines/fc/enrich-invoice-line')

let invoiceLine

describe('enrich FC invoice line', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetFundCode.mockReturnValue(DRD05)
    mockGetMarketingYear.mockReturnValue(2021)
    mockGetAccountCode.mockReturnValue(SOS710)
    mockGetDeliveryBody.mockReturnValue(FC00)

    invoiceLine = JSON.parse(JSON.stringify(require('../../../../mocks/payment-requests/invoice-line')))
  })

  test('should get FC fund code', async () => {
    enrichInvoiceLine(invoiceLine)
    expect(mockGetFundCode).toHaveBeenCalledWith(invoiceLine.standardCode)
  })

  test('should get FC marketing year', async () => {
    enrichInvoiceLine(invoiceLine)
    expect(mockGetMarketingYear).toHaveBeenCalledWith(invoiceLine.standardCode)
  })

  test('should get FC account code', async () => {
    enrichInvoiceLine(invoiceLine)
    expect(mockGetAccountCode).toHaveBeenCalledWith(invoiceLine.standardCode)
  })

  test('should get FC delivery body', async () => {
    enrichInvoiceLine(invoiceLine)
    expect(mockGetDeliveryBody).toHaveBeenCalledWith(invoiceLine.standardCode)
  })
})
