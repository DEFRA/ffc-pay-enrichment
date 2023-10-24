jest.mock('../../../../app/enrichment/header/get-correlation-id')
const { getCorrelationId: mockGetCorrelationId } = require('../../../../app/enrichment/header/get-correlation-id')

jest.mock('../../../../app/enrichment/header/get-agreement-number')
const { getAgreementNumber: mockGetAgreementNumber } = require('../../../../app/enrichment/header/get-agreement-number')

jest.mock('../../../../app/enrichment/header/create-invoice-number')
const { createInvoiceNumber: mockCreateInvoiceNumber } = require('../../../../app/enrichment/header/create-invoice-number')

jest.mock('../../../../app/enrichment/header/get-frn')
const { getFrn: mockGetFrn } = require('../../../../app/enrichment/header/get-frn')

jest.mock('../../../../app/enrichment/header/get-ledger')
const { getLedger: mockGetLedger } = require('../../../../app/enrichment/header/get-ledger')

jest.mock('../../../../app/enrichment/header/get-currency')
const { getCurrency: mockGetCurrency } = require('../../../../app/enrichment/header/get-currency')

jest.mock('../../../../app/enrichment/header/get-value')
const { getValue: mockGetValue } = require('../../../../app/enrichment/header/get-value')

jest.mock('../../../../app/enrichment/header/confirm-due-date')
const { confirmDueDate: mockConfirmDueDate } = require('../../../../app/enrichment/header/confirm-due-date')

jest.mock('../../../../app/date-convert')
const { convertToDaxDate: mockConvertToDaxDate } = require('../../../../app/date-convert')

const { CORRELATION_ID } = require('../../../mocks/values/correlation-id')
const { AGREEMENT_NUMBER } = require('../../../mocks/values/agreement-number')
const { SFI_INVOICE_NUMBER } = require('../../../mocks/values/invoice-number')
const { FRN } = require('../../../mocks/values/frn')
const { DUE_DATE_DAX } = require('../../../mocks/values/due-date')
const { EVENT_DATE_DAX } = require('../../../mocks/values/event-date')

const { AP } = require('../../../../app/constants/ledgers')
const { GBP } = require('../../../../app/constants/currency')

const { enrichHeader } = require('../../../../app/enrichment/header/enrich-header')

let scheme
let paymentRequest

describe('enrich header', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockGetCorrelationId.mockReturnValue(CORRELATION_ID)
    mockGetAgreementNumber.mockReturnValue(AGREEMENT_NUMBER)
    mockCreateInvoiceNumber.mockReturnValue(SFI_INVOICE_NUMBER)
    mockGetFrn.mockResolvedValue(FRN)
    mockGetLedger.mockReturnValue(AP)
    mockGetCurrency.mockReturnValue(GBP)
    mockGetValue.mockReturnValue(100)
    mockConfirmDueDate.mockReturnValue(DUE_DATE_DAX)
    mockConvertToDaxDate.mockReturnValue(EVENT_DATE_DAX)

    scheme = JSON.parse(JSON.stringify(require('../../../mocks/scheme')))
    paymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/payment-request')))
  })

  test('should set delivery body if scheme defined', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.deliveryBody).toBe(scheme.deliveryBody)
  })

  test('should not set delivery body if scheme not defined', async () => {
    scheme = undefined
    await enrichHeader(paymentRequest)
    expect(paymentRequest.deliveryBody).toBeUndefined()
  })

  test('should set scheme id if scheme defined', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.schemeId).toBe(scheme.schemeId)
  })

  test('should not set scheme id if scheme not defined', async () => {
    scheme = undefined
    await enrichHeader(paymentRequest)
    expect(paymentRequest.schemeId).toBeUndefined()
  })

  test('should get correlation id from existing correlation id', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetCorrelationId).toHaveBeenCalledWith(paymentRequest.correlationId)
  })

  test('should set correlation id', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.correlationId).toBe(CORRELATION_ID)
  })

  test('should get agreement number for payment request', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetAgreementNumber).toHaveBeenCalledWith(paymentRequest)
  })

  test('should set agreement number', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.agreementNumber).toBe(AGREEMENT_NUMBER)
  })

  test('should get invoice number', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockCreateInvoiceNumber).toHaveBeenCalledWith(paymentRequest)
  })

  test('should set invoice number', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.invoiceNumber).toBe(SFI_INVOICE_NUMBER)
  })

  test('should get frn', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetFrn).toHaveBeenCalledWith(paymentRequest)
  })

  test('should set frn', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.frn).toBe(FRN)
  })

  test('should get ledger', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetLedger).toHaveBeenCalledWith(paymentRequest.ledger)
  })

  test('should set ledger', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.ledger).toBe(AP)
  })

  test('should get currency', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetCurrency).toHaveBeenCalledWith(paymentRequest.currency)
  })

  test('should set currency', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.currency).toBe(GBP)
  })

  test('should get value', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetValue).toHaveBeenCalledWith(paymentRequest)
  })

  test('should set value', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.value).toBe(100)
  })

  test('should get due date', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockConfirmDueDate).toHaveBeenCalledWith(paymentRequest.schemeId, paymentRequest.marketingYear, paymentRequest.dueDate)
  })

  test('should set due date', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.dueDate).toBe(DUE_DATE_DAX)
  })

  test('should get event date', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockConvertToDaxDate).toHaveBeenCalledWith(paymentRequest.eventDate, false)
  })

  test('should set event date', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.eventDate).toBe(EVENT_DATE_DAX)
  })

  test('should convert recoveryDate to DAX format when recovery date present', async () => {
    paymentRequest.recoveryDate = '2023-10-24'
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.recoveryDate).toBe(DUE_DATE_DAX)
  })
})
