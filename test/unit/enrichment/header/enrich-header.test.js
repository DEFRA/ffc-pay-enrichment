const { AP } = require('../../../../app/constants/ledgers')
const { SFI_INVOICE_NUMBER } = require('../../../mocks/values/invoice-number')
const { FRN } = require('../../../mocks/values/frn')
const { DUE_DATE_DAX } = require('../../../mocks/values/due-date')
const { GBP } = require('../../../../app/constants/currency')

jest.mock('../../../../app/enrichment/header/create-invoice-number')
const { createInvoiceNumber: mockCreateInvoiceNumber } = require('../../../../app/enrichment/header/create-invoice-number')

jest.mock('../../../../app/enrichment/header/get-frn')
const { getFrn: mockGetFrn } = require('../../../../app/enrichment/header/get-frn')

jest.mock('../../../../app/enrichment/header/confirm-due-date')
const { confirmDueDate: mockConfirmDueDate } = require('../../../../app/enrichment/header/confirm-due-date')

const { enrichHeader } = require('../../../../app/enrichment/header/enrich-header')

let scheme
let paymentRequest

describe('enrich header', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockCreateInvoiceNumber.mockReturnValue(SFI_INVOICE_NUMBER)
    mockGetFrn.mockResolvedValue(FRN)
    mockConfirmDueDate.mockReturnValue(DUE_DATE_DAX)

    scheme = JSON.parse(JSON.stringify(require('../../../mocks/scheme')))
    paymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/payment-request')))
  })

  test('should retain correlation id if already exists', async () => {
    const originalCorrelationId = paymentRequest.correlationId
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.correlationId).toBe(originalCorrelationId)
  })

  test('should create uuid correlation id if does not exist', async () => {
    delete paymentRequest.correlationId
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.correlationId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
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

  test('should retain agreement number if already set', async () => {
    const originalAgreementNumber = paymentRequest.agreementNumber
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.agreementNumber).toBe(originalAgreementNumber)
  })

  test('should set agreement number to contract number if not already set', async () => {
    delete paymentRequest.agreementNumber
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.agreementNumber).toBe(paymentRequest.contractNumber)
  })

  test('should set invoice number', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(mockCreateInvoiceNumber).toHaveBeenCalledWith(paymentRequest)
    expect(paymentRequest.invoiceNumber).toBe(SFI_INVOICE_NUMBER)
  })

  test('should retain ledger if already set', async () => {
    const originalLedger = paymentRequest.ledger
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.ledger).toBe(originalLedger)
  })

  test('should set ledger to AP if not already set', async () => {
    delete paymentRequest.ledger
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.ledger).toBe(AP)
  })

  test('should convert value to pence', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.value).toBe(15000)
  })

  test('should retain frn if already set', async () => {
    const originalFrn = paymentRequest.frn
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.frn).toBe(originalFrn)
  })

  test('should set frn if not already set', async () => {
    delete paymentRequest.frn
    await enrichHeader(paymentRequest, scheme)
    expect(mockGetFrn).toHaveBeenCalledWith(paymentRequest)
    expect(paymentRequest.frn).toBe(FRN)
  })

  test('should set delivery body', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.deliveryBody).toBe(scheme.deliveryBody)
  })

  test('should not set delivery body if scheme not defined', async () => {
    scheme = undefined
    await enrichHeader(paymentRequest)
    expect(paymentRequest.deliveryBody).toBeUndefined()
  })

  test('should confirm due with DAX format', async () => {
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.dueDate).toBe(DUE_DATE_DAX)
  })

  test('should retain currency if already set', async () => {
    const originalCurrency = paymentRequest.currency
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.currency).toBe(originalCurrency)
  })

  test('should set currency to GBP if not already set', async () => {
    delete paymentRequest.currency
    await enrichHeader(paymentRequest, scheme)
    expect(paymentRequest.currency).toBe(GBP)
  })
})
