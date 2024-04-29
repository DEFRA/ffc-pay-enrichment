const { createInvoiceNumber } = require('../../../../app/enrichment/header/create-invoice-number')

let sfiPaymentRequest
let sfiPilotPaymentRequest
let lumpSumsPaymentRequest
let vetVisitsPaymentRequest
let csPaymentRequest
let bpsPaymentRequest
let fdmrPaymentRequest
let manualPaymentRequest
let esPaymentRequest
let impsPaymentRequest
let sfi23PaymentRequest
let delinkedPaymentRequest
let unknownPaymentRequest

describe('create invoice number', () => {
  beforeEach(() => {
    sfiPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/sfi')))
    sfiPilotPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/sfi-pilot')))
    lumpSumsPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/lump-sums')))
    vetVisitsPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/vet-visits')))
    csPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/cs')))
    bpsPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/bps')))
    fdmrPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/fdmr')))
    manualPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/manual')))
    esPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/es')))
    impsPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/imps')))
    sfi23PaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/sfi23')))
    delinkedPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/delinked')))
    unknownPaymentRequest = {
      schemeId: -1,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000000011',
      contractNumber: 'S1248977'
    }
  })

  test('generate invoice number for Sustainable Farming Incentive', () => {
    const result = createInvoiceNumber(sfiPaymentRequest)
    expect(result).toEqual('S000000100000001V001')
  })

  test('generate invoice number for Sustainable Farming Incentive Pilot', () => {
    const result = createInvoiceNumber(sfiPilotPaymentRequest)
    expect(result).toEqual('S000000100000001V001')
  })

  test('generate invoice number for Lump sums', () => {
    const result = createInvoiceNumber(lumpSumsPaymentRequest)
    expect(result).toEqual('S000000100000001V001')
  })

  test('generate invoice number for Vet Visits', () => {
    const result = createInvoiceNumber(vetVisitsPaymentRequest)
    expect(result).toEqual('SIP00000000001V001')
  })

  test('generate invoice number for Countryside Stewardship', () => {
    const result = createInvoiceNumber(csPaymentRequest)
    expect(result).toEqual('S000000100000001V001')
  })

  test('generate invoice number for Basic Payment Scheme', () => {
    const result = createInvoiceNumber(bpsPaymentRequest)
    expect(result).toEqual('S000000100000001V001')
  })

  test('generate invoice number for FDMR', () => {
    const result = createInvoiceNumber(fdmrPaymentRequest)
    expect(result).toEqual('F000000100000001V001')
  })

  test('generate invoice number for Manual Invoice', () => {
    const result = createInvoiceNumber(manualPaymentRequest)
    expect(result).toEqual(manualPaymentRequest.invoiceNumber)
  })

  test('generate invoice number for Environmental Stewardship', () => {
    const result = createInvoiceNumber(esPaymentRequest)
    expect(result).toEqual('I(0000001)00000001')
  })

  test('should return undefined for IMPS if current invoice number does not include /', () => {
    impsPaymentRequest.invoiceNumber = 'FVR'
    const result = createInvoiceNumber(impsPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('should retain invoice number for IMPS if it contains trader number after /', () => {
    const result = createInvoiceNumber(impsPaymentRequest)
    expect(result).toEqual(impsPaymentRequest.invoiceNumber)
  })

  test('should insert trader number into invoice number for IMPS if it does not contain trader number after / and has no characters after /', () => {
    impsPaymentRequest.invoiceNumber = 'FVR/'
    const result = createInvoiceNumber(impsPaymentRequest)
    expect(result).toEqual(`FVR/${impsPaymentRequest.trader}`)
  })

  test('should insert trader number into invoice number for IMPS if it does not contain trader number after / and has characters after /', () => {
    impsPaymentRequest.invoiceNumber = 'FVR/ABC'
    const result = createInvoiceNumber(impsPaymentRequest)
    expect(result).toEqual(`FVR/${impsPaymentRequest.trader}ABC`)
  })

  test('generate invoice number for Sustainable Farming Incentive 23', () => {
    const result = createInvoiceNumber(sfi23PaymentRequest)
    expect(result).toEqual('S000000100000001V001')
  })

  test('generate invoice number for Delinked Payments', () => {
    const result = createInvoiceNumber(delinkedPaymentRequest)
    expect(result).toEqual('S000000100000001V001')
  })

  test('generate default invoice format for unknown scheme', () => {
    const result = createInvoiceNumber(unknownPaymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
  })

  test('generate default invoice format for undefined scheme', () => {
    unknownPaymentRequest.schemeId = undefined
    const result = createInvoiceNumber(unknownPaymentRequest)
    expect(result).toEqual('SIP00000000000011V001')
  })

  test('return undefined if agreement number missing when needed', () => {
    delete unknownPaymentRequest.agreementNumber
    const result = createInvoiceNumber(unknownPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for default invoice', () => {
    delete unknownPaymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(unknownPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for SFI', () => {
    delete sfiPaymentRequest.invoiceNumber
    const result = createInvoiceNumber(sfiPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for SFI invoice', () => {
    delete sfiPaymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(sfiPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for SFI Pilot', () => {
    delete sfiPilotPaymentRequest.invoiceNumber
    const result = createInvoiceNumber(sfiPilotPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for SFI Pilot invoice', () => {
    delete sfiPilotPaymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(sfiPilotPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for Lump Sums', () => {
    delete lumpSumsPaymentRequest.invoiceNumber
    const result = createInvoiceNumber(lumpSumsPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for Lump Sums invoice', () => {
    delete lumpSumsPaymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(lumpSumsPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for CS', () => {
    delete csPaymentRequest.invoiceNumber
    const result = createInvoiceNumber(csPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for CS invoice', () => {
    delete csPaymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(csPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for BPS', () => {
    delete bpsPaymentRequest.invoiceNumber
    const result = createInvoiceNumber(bpsPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for BPS invoice', () => {
    delete bpsPaymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(bpsPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for FDMR', () => {
    delete fdmrPaymentRequest.invoiceNumber
    const result = createInvoiceNumber(fdmrPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if payment request number missing for FDMR invoice', () => {
    delete fdmrPaymentRequest.paymentRequestNumber
    const result = createInvoiceNumber(fdmrPaymentRequest)
    expect(result).toBeUndefined()
  })

  test('return undefined if invoice number missing for Manual Invoice', () => {
    delete manualPaymentRequest.invoiceNumber
    const result = createInvoiceNumber(manualPaymentRequest)
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
