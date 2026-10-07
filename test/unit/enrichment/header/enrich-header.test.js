jest.mock('../../../../app/enrichment/header/get-contract-number')
jest.mock('ffc-pay-schemes', () => {
  const actual = jest.requireActual('ffc-pay-schemes')

  return {
    ...actual,
    createInvoiceNumber: jest.fn(() => 'created-invoice-number'),
    schemeProvidesAccountingValues: jest.fn(() => false)
  }
})

jest.mock('../../../../app/enrichment/header/get-correlation-id')
jest.mock('../../../../app/enrichment/header/get-agreement-number')
jest.mock('../../../../app/enrichment/header/get-frn')
jest.mock('../../../../app/enrichment/header/get-ledger')
jest.mock('../../../../app/enrichment/header/get-currency')
jest.mock('../../../../app/enrichment/header/get-value')
jest.mock('../../../../app/enrichment/header/confirm-due-date')
jest.mock('../../../../app/enrichment/header/get-marketing-year')
jest.mock('../../../../app/enrichment/header/get-delivery-body')
jest.mock('../../../../app/date-convert')

const { getCorrelationId: mockGetCorrelationId } = require('../../../../app/enrichment/header/get-correlation-id')
const { getAgreementNumber: mockGetAgreementNumber } = require('../../../../app/enrichment/header/get-agreement-number')
const { getFrn: mockGetFrn } = require('../../../../app/enrichment/header/get-frn')
const { getLedger: mockGetLedger } = require('../../../../app/enrichment/header/get-ledger')
const { getCurrency: mockGetCurrency } = require('../../../../app/enrichment/header/get-currency')
const { getValue: mockGetValue } = require('../../../../app/enrichment/header/get-value')
const { confirmDueDate: mockConfirmDueDate } = require('../../../../app/enrichment/header/confirm-due-date')
const { getContractNumber: mockGetContractNumber } = require('../../../../app/enrichment/header/get-contract-number')
const { getMarketingYear: mockGetMarketingYear } = require('../../../../app/enrichment/header/get-marketing-year')
const { getDeliveryBody: mockGetDeliveryBody } = require('../../../../app/enrichment/header/get-delivery-body')
const { convertToDaxDate: mockConvertToDaxDate } = require('../../../../app/date-convert')

const { CORRELATION_ID } = require('../../../mocks/values/correlation-id')
const { AGREEMENT_NUMBER } = require('../../../mocks/values/agreement-number')
const { FRN } = require('../../../mocks/values/frn')
const { DUE_DATE_DAX } = require('../../../mocks/values/due-date')
const { EVENT_DATE_DAX } = require('../../../mocks/values/event-date')

const { AP } = require('../../../../app/constants/ledgers')
const { GBP } = require('../../../../app/constants/currency')
const { FC00 } = require('../../../../app/constants/fc-delivery-bodies')

const { enrichHeader } = require('../../../../app/enrichment/header/enrich-header')
const { CONTRACT_NUMBER } = require('../../../mocks/values/contract-number')
const { MARKETING_YEAR } = require('../../../mocks/values/marketing-year')

let scheme
let paymentRequest

describe('enrichHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetCorrelationId.mockReturnValue(CORRELATION_ID)
    mockGetContractNumber.mockReturnValue(CONTRACT_NUMBER)
    mockGetAgreementNumber.mockReturnValue(AGREEMENT_NUMBER)
    mockGetFrn.mockResolvedValue(FRN)
    mockGetLedger.mockReturnValue(AP)
    mockGetCurrency.mockReturnValue(GBP)
    mockGetValue.mockReturnValue(100)
    mockGetDeliveryBody.mockReturnValue(FC00)
    mockConfirmDueDate.mockReturnValue(DUE_DATE_DAX)
    mockGetMarketingYear.mockReturnValue(MARKETING_YEAR)
    mockConvertToDaxDate.mockReturnValue(EVENT_DATE_DAX)

    scheme = JSON.parse(JSON.stringify(require('../../../mocks/scheme')))
    paymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/payment-request')))
  })

  test('should enrich scheme and delivery body', async () => {
    await enrichHeader(paymentRequest, scheme)

    expect(paymentRequest.schemeId).toBe(scheme.schemeId)
    expect(paymentRequest.deliveryBody).toBe(FC00)
  })

  test('should set providesAccountingValues to output of schemeProvidesAccountingValues', async () => {
    await enrichHeader(paymentRequest, scheme)

    expect(paymentRequest.providesAccountingValues).toBe(false)
  })

  test('should handle missing scheme', async () => {
    await enrichHeader(paymentRequest, undefined)

    expect(paymentRequest.schemeId).toBeUndefined()
    expect(paymentRequest.providesAccountingValues).toBe(false)
  })

  test('should enrich contract number', async () => {
    await enrichHeader(paymentRequest, scheme)

    expect(mockGetContractNumber).toHaveBeenCalledWith(paymentRequest)
    expect(paymentRequest.contractNumber).toBe(CONTRACT_NUMBER)
  })

  test('should enrich marketing year', async () => {
    await enrichHeader(paymentRequest, scheme)

    expect(mockGetMarketingYear).toHaveBeenCalledWith(paymentRequest)
    expect(paymentRequest.marketingYear).toBe(MARKETING_YEAR)
  })

  test('should enrich due date, event date and claim date', async () => {
    await enrichHeader(paymentRequest, scheme)

    expect(mockConfirmDueDate).toHaveBeenCalledWith(
      paymentRequest.schemeId,
      paymentRequest.marketingYear,
      paymentRequest.dueDate
    )
    expect(paymentRequest.dueDate).toBe(DUE_DATE_DAX)

    expect(mockConvertToDaxDate).toHaveBeenCalledWith(paymentRequest.eventDate, false)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith(paymentRequest.claimDate, false)
    expect(paymentRequest.eventDate).toBe(EVENT_DATE_DAX)
    expect(paymentRequest.claimDate).toBe(EVENT_DATE_DAX)
  })

  test('should convert recoveryDate and originalSettlementDate', async () => {
    paymentRequest.recoveryDate = '2023-10-24'
    paymentRequest.originalSettlementDate = '2023-10-24'

    await enrichHeader(paymentRequest, scheme)

    expect(mockConvertToDaxDate).toHaveBeenCalledWith('2023-10-24', false)
    expect(paymentRequest.recoveryDate).toBe(EVENT_DATE_DAX)
    expect(paymentRequest.originalSettlementDate).toBe(EVENT_DATE_DAX)
  })
})
