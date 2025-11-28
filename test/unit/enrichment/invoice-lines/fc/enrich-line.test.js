jest.mock('../../../../../app/enrichment/invoice-lines/fc/get-fund-code')
jest.mock('../../../../../app/enrichment/invoice-lines/fc/get-marketing-year')
jest.mock('../../../../../app/enrichment/invoice-lines/fc/get-account-code')
jest.mock('../../../../../app/enrichment/invoice-lines/fc/get-delivery-body')

const { getFundCode: mockGetFundCode } = require('../../../../../app/enrichment/invoice-lines/fc/get-fund-code')
const { getMarketingYear: mockGetMarketingYear } = require('../../../../../app/enrichment/invoice-lines/fc/get-marketing-year')
const { getAccountCode: mockGetAccountCode } = require('../../../../../app/enrichment/invoice-lines/fc/get-account-code')
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

  const mocks = [
    ['fund code', mockGetFundCode],
    ['marketing year', mockGetMarketingYear],
    ['account code', mockGetAccountCode],
    ['delivery body', mockGetDeliveryBody]
  ]

  test.each(mocks)('should get FC %s', async (_, mockFn) => {
    enrichInvoiceLine(invoiceLine)
    expect(mockFn).toHaveBeenCalledWith(invoiceLine.standardCode)
  })
})
