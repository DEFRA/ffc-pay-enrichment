const { createInvoiceNumber } = require('../../../../app/enrichment/header/create-invoice-number')

let paymentRequests

const clone = (path) => {
  return JSON.parse(JSON.stringify(require(`../../../mocks/payment-requests/${path}`)))
}

describe('createInvoiceNumber', () => {
  beforeEach(() => {
    paymentRequests = {
      sfi: clone('sfi'),
      sfiPilot: clone('sfi-pilot'),
      lumpSums: clone('lump-sums'),
      vetVisits: clone('vet-visits'),
      cs: clone('cs'),
      bps: clone('bps'),
      manual: clone('manual'),
      es: clone('es'),
      imps: clone('imps'),
      sfi23: clone('sfi23'),
      delinked: clone('delinked'),
      sfiExpanded: clone('sfi-expanded'),
      cohtRevenue: clone('coht-revenue'),
      cohtCapital: clone('coht-capital'),
      unknown: {
        schemeId: -1,
        paymentRequestNumber: 1,
        agreementNumber: 'SIP00000000000011',
        contractNumber: 'S1248977'
      }
    }
  })

  describe.each([
    ['SFI', 'sfi', 'S000000100000001V001'],
    ['SFI Pilot', 'sfiPilot', 'S000000100000001V001'],
    ['Lump Sums', 'lumpSums', 'S000000100000001V001'],
    ['Vet Visits', 'vetVisits', 'SIP00000000001V001'],
    ['CS', 'cs', 'S000000100000001V001'],
    ['BPS', 'bps', 'S000000100000001V001'],
    ['Manual Invoice', 'manual', (pr) => pr.invoiceNumber],
    ['Environmental Stewardship', 'es', 'I(0000001)00000001'],
    ['SFI 23', 'sfi23', 'S000000100000001V001'],
    ['Delinked', 'delinked', 'D000000100000001V001'],
    ['SFI Expanded', 'sfiExpanded', 'E000000100000001V001'],
    ['COHT Revenue', 'cohtRevenue', 'C000000100000001V001'],
    ['COHT Capital', 'cohtCapital', 'C000000100000001V001']
  ])('%s', (_, key, expected) => {
    test('generates correct invoice number', () => {
      const result = createInvoiceNumber(paymentRequests[key])
      const expectedValue = typeof expected === 'function' ? expected(paymentRequests[key]) : expected
      expect(result).toEqual(expectedValue)
    })
  })

  describe('IMPS special handling', () => {
    test('returns undefined if invoice does not include /', () => {
      paymentRequests.imps.invoiceNumber = 'FVR'
      expect(createInvoiceNumber(paymentRequests.imps)).toBeUndefined()
    })

    test('retains invoice number if it contains trader number after /', () => {
      expect(createInvoiceNumber(paymentRequests.imps)).toEqual(paymentRequests.imps.invoiceNumber)
    })

    test('inserts trader number if missing after / and none after /', () => {
      paymentRequests.imps.invoiceNumber = 'FVR/'
      expect(createInvoiceNumber(paymentRequests.imps)).toEqual(`FVR/${paymentRequests.imps.trader}`)
    })

    test('inserts trader number if missing after / and some chars after /', () => {
      paymentRequests.imps.invoiceNumber = 'FVR/ABC'
      expect(createInvoiceNumber(paymentRequests.imps)).toEqual(`FVR/${paymentRequests.imps.trader}ABC`)
    })
  })

  test('returns undefined for invalid or missing payment request', () => {
    const invalidValues = [undefined, null, [], '', true, false, 0, 1]
    invalidValues.forEach(val => {
      expect(createInvoiceNumber(val)).toBeUndefined()
    })
  })

  describe('returns undefined if required fields missing', () => {
    test.each([
      ['agreementNumber', 'unknown'],
      ['paymentRequestNumber', 'unknown'],
      ['invoiceNumber', 'sfi'],
      ['paymentRequestNumber', 'sfi'],
      ['invoiceNumber', 'sfiPilot'],
      ['paymentRequestNumber', 'sfiPilot'],
      ['invoiceNumber', 'lumpSums'],
      ['paymentRequestNumber', 'lumpSums'],
      ['invoiceNumber', 'cs'],
      ['paymentRequestNumber', 'cs'],
      ['paymentRequestNumber', 'cohtRevenue'],
      ['paymentRequestNumber', 'cohtCapital'],
      ['invoiceNumber', 'bps'],
      ['paymentRequestNumber', 'bps'],
      ['invoiceNumber', 'manual']
    ])('%s missing for %s', (field, key) => {
      delete paymentRequests[key][field]
      expect(createInvoiceNumber(paymentRequests[key])).toBeUndefined()
    })
  })
})
