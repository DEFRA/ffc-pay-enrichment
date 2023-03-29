const createInvoiceNumber = require('../../../app/enrichment/create-invoice-number')
const { SFI_PILOT, SFI, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR } = require('../../../app/constants/schemes')

let paymentRequest

describe('create invoice number', () => {
  beforeEach(() => {
    paymentRequest = {
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000000011',
      contractNumber: 'S1248977'
    }
  })

  test('generate invoice number for Sustainable Farming Incentive', () => {
    paymentRequest.schemeId = SFI
    paymentRequest.invoiceNumber = 'SFI0123456'
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0123456S1248977V001')
  })

  test('generate invoice number for Sustainable Farming Incentive Pilot', () => {
    paymentRequest.schemeId = SFI_PILOT
    paymentRequest.invoiceNumber = 'SFIP0123456'
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0123456S1248977V001')
  })

  test('generate invoice number for Lump sums', () => {
    paymentRequest.schemeId = LUMP_SUMS
    paymentRequest.invoiceNumber = 'LSES0123456'
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0123456S1248977V001')
  })

  test('generate invoice number for Vet Visits', () => {
    paymentRequest.schemeId = VET_VISITS
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
  })

  test('generate invoice number for Countryside Stewardship', () => {
    paymentRequest.schemeId = CS
    paymentRequest.invoiceNumber = 'CS00123456'
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0123456S1248977V001')
  })

  test('generate invoice number for Basic Payment Scheme', () => {
    paymentRequest.schemeId = BPS
    paymentRequest.invoiceNumber = 'SITI0123456'
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0123456S1248977V001')
  })

  test('generate invoice number for FDMR', () => {
    paymentRequest.schemeId = FDMR
    paymentRequest.invoiceNumber = 'FDMR0123456'
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('F0123456S1248977V001')
  })

  test('generate default invoice format for unknown scheme', () => {
    paymentRequest.schemeId = -1
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
  })

  test('generate default invoice format for undefined scheme', () => {
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
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

  test('return undefined if invoice number missing for SFI', () => {
    paymentRequest.schemeId = SFI
    delete paymentRequest.invoiceNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for SFI invoice', () => {
    paymentRequest.schemeId = SFI
    delete paymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for SFI Pilot', () => {
    paymentRequest.schemeId = SFI_PILOT
    delete paymentRequest.invoiceNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for SFI Pilot invoice', () => {
    paymentRequest.schemeId = SFI_PILOT
    delete paymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for Lump Sums', () => {
    paymentRequest.schemeId = LUMP_SUMS
    delete paymentRequest.invoiceNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for Lump Sums', () => {
    paymentRequest.schemeId = LUMP_SUMS
    delete paymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for CS', () => {
    paymentRequest.schemeId = CS
    delete paymentRequest.invoiceNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for CS invoice', () => {
    paymentRequest.schemeId = CS
    delete paymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for BPS', () => {
    paymentRequest.schemeId = BPS
    delete paymentRequest.invoiceNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for BPS invoice', () => {
    paymentRequest.schemeId = BPS
    delete paymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for FDMR invoice', () => {
    paymentRequest.schemeId = FDMR
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
