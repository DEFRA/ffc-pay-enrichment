jest.mock('../../../../app/enrichment/header/get-correlation-id')
jest.mock('../../../../app/enrichment/header/get-agreement-number')
jest.mock('../../../../app/enrichment/header/create-invoice-number')
jest.mock('../../../../app/enrichment/header/get-frn')
jest.mock('../../../../app/enrichment/header/get-ledger')
jest.mock('../../../../app/enrichment/header/get-currency')
jest.mock('../../../../app/enrichment/header/get-value')
jest.mock('../../../../app/enrichment/header/confirm-due-date')
jest.mock('../../../../app/enrichment/header/get-delivery-body')
jest.mock('../../../../app/date-convert')

const { getCorrelationId: mockGetCorrelationId } = require('../../../../app/enrichment/header/get-correlation-id')
const { getAgreementNumber: mockGetAgreementNumber } = require('../../../../app/enrichment/header/get-agreement-number')
const { createInvoiceNumber: mockCreateInvoiceNumber } = require('../../../../app/enrichment/header/create-invoice-number')
const { getFrn: mockGetFrn } = require('../../../../app/enrichment/header/get-frn')
const { getLedger: mockGetLedger } = require('../../../../app/enrichment/header/get-ledger')
const { getCurrency: mockGetCurrency } = require('../../../../app/enrichment/header/get-currency')
const { getValue: mockGetValue } = require('../../../../app/enrichment/header/get-value')
const { confirmDueDate: mockConfirmDueDate } = require('../../../../app/enrichment/header/confirm-due-date')
const { getDeliveryBody: mockGetDeliveryBody } = require('../../../../app/enrichment/header/get-delivery-body')
const { convertToDaxDate: mockConvertToDaxDate } = require('../../../../app/date-convert')

const { CORRELATION_ID } = require('../../../mocks/values/correlation-id')
const { AGREEMENT_NUMBER } = require('../../../mocks/values/agreement-number')
const { SFI_INVOICE_NUMBER } = require('../../../mocks/values/invoice-number')
const { FRN } = require('../../../mocks/values/frn')
const { DUE_DATE_DAX } = require('../../../mocks/values/due-date')
const { EVENT_DATE_DAX } = require('../../../mocks/values/event-date')

const { AP } = require('../../../../app/constants/ledgers')
const { GBP } = require('../../../../app/constants/currency')
const { NE00 } = require('../../../../app/constants/delivery-bodies')

const { enrichHeader } = require('../../../../app/enrichment/header/enrich-header')

let scheme
let paymentRequest

describe('enrichHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetCorrelationId.mockReturnValue(CORRELATION_ID)
    mockGetAgreementNumber.mockReturnValue(AGREEMENT_NUMBER)
    mockCreateInvoiceNumber.mockReturnValue(SFI_INVOICE_NUMBER)
    mockGetFrn.mockResolvedValue(FRN)
    mockGetLedger.mockReturnValue(AP)
    mockGetCurrency.mockReturnValue(GBP)
    mockGetValue.mockReturnValue(100)
    mockGetDeliveryBody.mockReturnValue(NE00)
    mockConfirmDueDate.mockReturnValue(DUE_DATE_DAX)
    mockConvertToDaxDate.mockReturnValue(EVENT_DATE_DAX)

    scheme = JSON.parse(JSON.stringify(require('../../../mocks/scheme')))
    paymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/payment-request')))
  })

  test('should enrich scheme and deliveryBody', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.schemeId).toBe(scheme.schemeId)
    expect(paymentRequest.deliveryBody).toBe(NE00)
  })

  test('should handle missing scheme', async () => {
    await enrichHeader(paymentRequest, undefined)
    expect(paymentRequest.schemeId).toBeUndefined()
  })

  test('should enrich correlationId', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetCorrelationId).toHaveBeenCalledWith(paymentRequest.correlationId)
    expect(paymentRequest.correlationId).toBe(CORRELATION_ID)
  })

  test('should enrich agreementNumber', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetAgreementNumber).toHaveBeenCalledWith(paymentRequest)
    expect(paymentRequest.agreementNumber).toBe(AGREEMENT_NUMBER)
  })

  test('should enrich invoice number', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockCreateInvoiceNumber).toHaveBeenCalledWith(paymentRequest)
    expect(paymentRequest.invoiceNumber).toBe(SFI_INVOICE_NUMBER)
  })

  test('should enrich frn', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetFrn).toHaveBeenCalledWith(paymentRequest)
    expect(paymentRequest.frn).toBe(FRN)
  })

  test('should enrich ledger and currency', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetLedger).toHaveBeenCalledWith(paymentRequest.ledger)
    expect(paymentRequest.ledger).toBe(AP)
    expect(mockGetCurrency).toHaveBeenCalledWith(paymentRequest.currency)
    expect(paymentRequest.currency).toBe(GBP)
  })

  test('should enrich value', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetValue).toHaveBeenCalledWith(paymentRequest)
    expect(paymentRequest.value).toBe(100)
  })

  test('should enrich dueDate and eventDate', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockConfirmDueDate).toHaveBeenCalledWith(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
    expect(paymentRequest.dueDate).toBe(DUE_DATE_DAX)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith(paymentRequest.eventDate, false)
    expect(paymentRequest.eventDate).toBe(EVENT_DATE_DAX)
  })

  test('should convert recoveryDate and originalSettlementDate', async () => {
    paymentRequest.recoveryDate = '2023-10-24'
    paymentRequest.originalSettlementDate = '2023-10-24'
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.recoveryDate).toBe(DUE_DATE_DAX)
    expect(paymentRequest.originalSettlementDate).toBe(DUE_DATE_DAX)
  })
})
