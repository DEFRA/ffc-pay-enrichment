const { getScheme } = require('../../../app/enrichment/get-scheme')
const { enrichHeader } = require('../../../app/enrichment/header')
const { validateHeader } = require('../../../app/enrichment/validate-header')
const { enrichInvoiceLines } = require('../../../app/enrichment/invoice-lines')
const { validateValues } = require('../../../app/enrichment/validate-values')
const { enrichPaymentRequest } = require('../../../app/enrichment/enrich-payment-request')

jest.mock('../../../app/enrichment/get-scheme')
jest.mock('../../../app/enrichment/header')
jest.mock('../../../app/enrichment/validate-header')
jest.mock('../../../app/enrichment/invoice-lines')
jest.mock('../../../app/enrichment/validate-values')

describe('enrichPaymentRequest', () => {
  const paymentRequest = {
    schemeId: 1,
    sourceSystem: 'sourceSystem',
    pillar: 'pillar',
    value: 100,
    invoiceLines: []
  }

  const mockScheme = { schemeId: 1 }

  beforeEach(() => {
    jest.clearAllMocks()
    getScheme.mockReturnValue(mockScheme)
    enrichHeader.mockImplementation(jest.fn())
    validateHeader.mockImplementation(jest.fn())
    enrichInvoiceLines.mockImplementation(jest.fn())
    validateValues.mockImplementation(jest.fn())
  })

  test('should call getScheme with correct parameters', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(getScheme).toHaveBeenCalledWith(paymentRequest.schemeId, paymentRequest.sourceSystem, paymentRequest.pillar)
  })

  test('should call enrichHeader with correct parameters', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(enrichHeader).toHaveBeenCalledWith(paymentRequest, mockScheme)
  })

  test('should call validateHeader with correct parameters', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(validateHeader).toHaveBeenCalledWith(paymentRequest)
  })

  test('should call enrichInvoiceLines with correct parameters', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(enrichInvoiceLines).toHaveBeenCalledWith(paymentRequest.invoiceLines, paymentRequest.schemeId, paymentRequest.marketingYear, mockScheme)
  })

  test('should call validateValues with correct parameters', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(validateValues).toHaveBeenCalledWith(paymentRequest.value, paymentRequest.invoiceLines)
  })

  test('should handle errors thrown by getScheme', async () => {
    getScheme.mockImplementation(() => { throw new Error('Error in getScheme') })
    await expect(enrichPaymentRequest(paymentRequest)).rejects.toThrow('Error in getScheme')
  })

  test('should handle errors thrown by enrichHeader', async () => {
    enrichHeader.mockImplementation(() => { throw new Error('Error in enrichHeader') })
    await expect(enrichPaymentRequest(paymentRequest)).rejects.toThrow('Error in enrichHeader')
  })

  test('should handle errors thrown by validateHeader', async () => {
    validateHeader.mockImplementation(() => { throw new Error('Error in validateHeader') })
    await expect(enrichPaymentRequest(paymentRequest)).rejects.toThrow('Error in validateHeader')
  })

  test('should handle errors thrown by enrichInvoiceLines', async () => {
    enrichInvoiceLines.mockImplementation(() => { throw new Error('Error in enrichInvoiceLines') })
    await expect(enrichPaymentRequest(paymentRequest)).rejects.toThrow('Error in enrichInvoiceLines')
  })

  test('should handle errors thrown by validateValues', async () => {
    validateValues.mockImplementation(() => { throw new Error('Error in validateValues') })
    await expect(enrichPaymentRequest(paymentRequest)).rejects.toThrow('Error in validateValues')
  })
})
