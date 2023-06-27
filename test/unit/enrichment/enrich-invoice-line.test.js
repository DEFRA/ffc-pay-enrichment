jest.mock('../../../app/enrichment/enrich-es-invoice-line')
const { enrichESInvoiceLine: mockEnrichESInvoiceLine } = require('../../../app/enrichment/enrich-es-invoice-line')

jest.mock('../../../app/currency-convert')
const { convertToPence: mockConvertToPence } = require('../../../app/currency-convert')

jest.mock('../../../app/enrichment/get-scheme-code')
const { getSchemeCode: mockGetSchemeCode } = require('../../../app/enrichment/get-scheme-code')

jest.mock('../../../app/enrichment/get-fund-code')
const { getFundCode: mockGetFundCode } = require('../../../app/enrichment/get-fund-code')

jest.mock('../../../app/enrichment/get-delivery-body')
const { getDeliveryBody: mockGetDeliveryBody } = require('../../../app/enrichment/get-delivery-body')

jest.mock('../../../app/enrichment/get-marketing-year')
const { getMarketingYear: mockGetMarketingYear } = require('../../../app/enrichment/get-marketing-year')

jest.mock('../../../app/enrichment/is-state-aid')
const { isStateAid: mockIsStateAid } = require('../../../app/enrichment/is-state-aid')

const { SCHEME_CODE } = require('../../mocks/values/scheme-code')
const { FUND_CODE } = require('../../mocks/values/fund-code')
const { DELIVERY_BODY_RPA } = require('../../mocks/values/delivery-body')

const { ES } = require('../../../app/constants/schemes')

const { enrichInvoiceLine } = require('../../../app/enrichment/enrich-invoice-line')

const marketingYear = 2023

let scheme
let invoiceLine

describe('enrich header', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockConvertToPence.mockReturnValue(25000)
    mockGetSchemeCode.mockReturnValue(SCHEME_CODE)
    mockGetFundCode.mockReturnValue(FUND_CODE)
    mockGetDeliveryBody.mockReturnValue(DELIVERY_BODY_RPA)
    mockGetMarketingYear.mockReturnValue(marketingYear)
    mockIsStateAid.mockReturnValue(false)

    scheme = JSON.parse(JSON.stringify(require('../../mocks/scheme')))
    invoiceLine = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/invoice-line')))
  })

  test('should enrich invoice line with ES rules if scheme is ES', async () => {
    scheme.schemeId = ES
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockEnrichESInvoiceLine).toHaveBeenCalledWith(invoiceLine)
  })

  test('should not enrich invoice line with ES rules if scheme is not ES', async () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockEnrichESInvoiceLine).not.toHaveBeenCalled()
  })

  test('should convert value to pence', async () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockConvertToPence).toHaveBeenCalledWith(250)
  })

  test('should get scheme code', async () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockGetSchemeCode).toHaveBeenCalledWith(invoiceLine)
  })

  test('should get fund code', async () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockGetFundCode).toHaveBeenCalledWith(invoiceLine, FUND_CODE)
  })

  test('should set convergence to false if not set', async () => {
    delete invoiceLine.convergence
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.convergence).toBe(false)
  })

  test('should set convergence to true if set', async () => {
    invoiceLine.convergence = true
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.convergence).toBe(true)
  })

  test('should get delivery body', async () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockGetDeliveryBody).toHaveBeenCalledWith(invoiceLine, DELIVERY_BODY_RPA)
  })

  test('should get marketing year', async () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockGetMarketingYear).toHaveBeenCalledWith(invoiceLine, marketingYear)
  })

  test('should get state aid', async () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockIsStateAid).toHaveBeenCalledWith(invoiceLine)
  })
})
