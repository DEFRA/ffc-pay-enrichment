jest.mock('../../../../app/enrichment/invoice-lines/es')
jest.mock('../../../../app/enrichment/invoice-lines/fc')
jest.mock('../../../../app/enrichment/invoice-lines/imps')
jest.mock('../../../../app/currency-convert')
jest.mock('../../../../app/enrichment/invoice-lines/get-scheme-code')
jest.mock('../../../../app/enrichment/invoice-lines/get-fund-code')
jest.mock('../../../../app/enrichment/invoice-lines/get-delivery-body')
jest.mock('../../../../app/enrichment/invoice-lines/get-marketing-year')
jest.mock('../../../../app/enrichment/invoice-lines/is-state-aid')

const { enrichInvoiceLine: mockEnrichESInvoiceLine } = require('../../../../app/enrichment/invoice-lines/es')
const { enrichInvoiceLine: mockEnrichFCInvoiceLine } = require('../../../../app/enrichment/invoice-lines/fc')
const { enrichInvoiceLine: mockEnrichIMPSInvoiceLine } = require('../../../../app/enrichment/invoice-lines/imps')
const { convertToPence: mockConvertToPence } = require('../../../../app/currency-convert')
const { getSchemeCode: mockGetSchemeCode } = require('../../../../app/enrichment/invoice-lines/get-scheme-code')
const { getFundCode: mockGetFundCode } = require('../../../../app/enrichment/invoice-lines/get-fund-code')
const { getDeliveryBody: mockGetDeliveryBody } = require('../../../../app/enrichment/invoice-lines/get-delivery-body')
const { getMarketingYear: mockGetMarketingYear } = require('../../../../app/enrichment/invoice-lines/get-marketing-year')
const { isStateAid: mockIsStateAid } = require('../../../../app/enrichment/invoice-lines/is-state-aid')

const { SCHEME_CODE } = require('../../../mocks/values/scheme-code')
const { FUND_CODE } = require('../../../mocks/values/fund-code')
const { DELIVERY_BODY_RPA } = require('../../../mocks/values/delivery-body')
const { ES, FC, IMPS } = require('../../../../app/constants/schemes')

const { enrichInvoiceLine } = require('../../../../app/enrichment/invoice-lines/enrich-invoice-line')

describe('enrich header', () => {
  let scheme, invoiceLine
  const marketingYear = 2023

  beforeEach(() => {
    jest.clearAllMocks()

    mockConvertToPence.mockReturnValue(25000)
    mockGetSchemeCode.mockReturnValue(SCHEME_CODE)
    mockGetFundCode.mockReturnValue(FUND_CODE)
    mockGetDeliveryBody.mockReturnValue(DELIVERY_BODY_RPA)
    mockGetMarketingYear.mockReturnValue(marketingYear)
    mockIsStateAid.mockReturnValue(false)

    scheme = JSON.parse(JSON.stringify(require('../../../mocks/scheme')))
    invoiceLine = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/invoice-line')))
  })

  describe.each([
    [ES, mockEnrichESInvoiceLine],
    [FC, mockEnrichFCInvoiceLine],
    [IMPS, mockEnrichIMPSInvoiceLine]
  ])('scheme-specific enrichment for %s', (schemeId, mockEnrich) => {
    test(`should enrich invoice line if scheme is ${schemeId}`, () => {
      scheme.schemeId = schemeId
      enrichInvoiceLine(invoiceLine, marketingYear, scheme)
      expect(mockEnrich).toHaveBeenCalledWith(invoiceLine)
    })

    test(`should not enrich invoice line if scheme is not ${schemeId}`, () => {
      enrichInvoiceLine(invoiceLine, marketingYear, scheme)
      expect(mockEnrich).not.toHaveBeenCalled()
    })
  })

  test('should convert value to pence', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockConvertToPence).toHaveBeenCalledWith(250)
  })

  test('should get scheme code', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockGetSchemeCode).toHaveBeenCalledWith(invoiceLine)
  })

  test('should get fund code', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockGetFundCode).toHaveBeenCalledWith(invoiceLine, FUND_CODE)
  })

  test('should set convergence to false if not set', () => {
    delete invoiceLine.convergence
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.convergence).toBe(false)
  })

  test('should retain convergence if set', () => {
    invoiceLine.convergence = true
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(invoiceLine.convergence).toBe(true)
  })

  test('should get delivery body', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockGetDeliveryBody).toHaveBeenCalledWith(invoiceLine, DELIVERY_BODY_RPA)
  })

  test('should get marketing year', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockGetMarketingYear).toHaveBeenCalledWith(invoiceLine, marketingYear)
  })

  test('should get state aid', () => {
    enrichInvoiceLine(invoiceLine, marketingYear, scheme)
    expect(mockIsStateAid).toHaveBeenCalledWith(invoiceLine)
  })
})
