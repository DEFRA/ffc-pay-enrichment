const createInvoiceNumber = require('../../../app/enrichment/create-invoice-number')
const { SFI_PILOT, SFI, LUMP_SUMS, VET_VISITS, LNR } = require('../../../app/schemes')

let paymentRequest

describe('generate invoice number', () => {
  beforeEach(() => {
    paymentRequest = {
      invoiceNumber: 'SFIP0695764',
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000000011',
      contractNumber: 'S1248977'
    }
  })

  test('generate invoice number for SFI', () => {
    paymentRequest.schemeId = SFI
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0695764S1248977V001')
  })

  test('generate invoice number for SFI Pilot', () => {
    paymentRequest.schemeId = SFI_PILOT
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0695764S1248977V001')
  })

  test('generate invoice number for Lump sums', () => {
    paymentRequest.schemeId = LUMP_SUMS
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0695764S1248977V001')
  })

  test('generate invoice number for Vet Visits', () => {
    paymentRequest.schemeId = VET_VISITS
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
  })

  test('generate invoice number for LNR', () => {
    paymentRequest.schemeId = LNR
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
  })

  test('generate default invoice format for unknown scheme', () => {
    paymentRequest.schemeId = 6
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
  })

  test('generate default invoice format for undefined scheme', () => {
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
  })

  test('return undefined if invoice number missing when needed', () => {
    paymentRequest.schemeId = SFI
    delete paymentRequest.invoiceNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if agreement number missing when needed', () => {
    delete paymentRequest.agreementNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for default invoice', () => {
    delete paymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for Siti Agri invoice', () => {
    paymentRequest.schemeId = SFI
    delete paymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request undefined', () => {
    const result = createInvoiceNumber(undefined)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request null', () => {
    const result = createInvoiceNumber(null)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request array', () => {
    const result = createInvoiceNumber([])
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request string', () => {
    const result = createInvoiceNumber('')
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request true', () => {
    const result = createInvoiceNumber(true)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request false', () => {
    const result = createInvoiceNumber(false)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request 0', () => {
    const result = createInvoiceNumber(0)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request 1', () => {
    const result = createInvoiceNumber(1)
    expect(result).toBeUndefined()
  })
})
