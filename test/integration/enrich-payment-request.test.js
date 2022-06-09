const { GBP } = require('../../app/currency')
const db = require('../../app/data')
const enrichPaymentRequest = require('../../app/enrichment')
const { AP } = require('../../app/ledgers')
const { M12 } = require('../../app/schedules')
let scheme
let schemeCode
let paymentRequest
let frn

describe('enrich payment request', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    scheme = {
      schemeId: 1,
      name: 'SFI',
      deliveryBody: 'RP00',
      sourceSystem: 'SFIP',
      fundCode: 'DRD10'
    }

    frn = {
      sbi: 123456789,
      frn: 1234567890
    }

    paymentRequest = {
      sourceSystem: 'SFIP',
      deliveryBody: 'RP00',
      sbi: 123456789,
      paymentRequestNumber: 1,
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP000001',
      marketingYear: 2022,
      currency: 'EUR',
      schedule: M12,
      dueDate: '2021-08-15',
      value: 150.00,
      invoiceLines: [
        {
          standardCode: '80001',
          description: 'G00 - Gross value of claim',
          value: 250.00
        },
        {
          standardCode: '80001',
          description: 'P02 - Over declaration penalty',
          value: -100.00
        }
      ]
    }

    schemeCode = {
      schemeCodeId: 1,
      standardCode: '80001',
      schemeCode: '80001'
    }

    await db.scheme.create(scheme)
    await db.schemeCode.create(schemeCode)
    await db.frn.create(frn)
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  test('should error for empty payment request', async () => {
    try {
      await enrichPaymentRequest({})
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for undefined as payment request', async () => {
    try {
      await enrichPaymentRequest(undefined)
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for null as payment request', async () => {
    try {
      await enrichPaymentRequest(null)
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for array as payment request', async () => {
    try {
      await enrichPaymentRequest([])
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for string as payment request', async () => {
    try {
      await enrichPaymentRequest('')
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for false as payment request', async () => {
    try {
      await enrichPaymentRequest(false)
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for true as payment request', async () => {
    try {
      await enrichPaymentRequest(true)
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for 0 as payment request', async () => {
    try {
      await enrichPaymentRequest(0)
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for 1 as payment request', async () => {
    try {
      await enrichPaymentRequest(1)
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should error for payment request without invoice lines', async () => {
    delete paymentRequest.invoiceLines
    try {
      await enrichPaymentRequest(paymentRequest)
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.category).toBe('validation')
    }
  })

  test('should add frn', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.frn).toBe(1234567890)
  })

  test('should add schemeId', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.schemeId).toBe(1)
  })

  test('should add ledger', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.ledger).toBe(AP)
  })

  test('should add delivery body', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.deliveryBody).toBe('RP00')
  })

  test('should transform value to pence', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.value).toBe(15000)
  })

  test('should add scheme codes', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.invoiceLines[0].schemeCode).toBe('80001')
    expect(paymentRequest.invoiceLines[1].schemeCode).toBe('80001')
  })

  test('should add fund codes', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.invoiceLines[0].fundCode).toBe('DRD10')
    expect(paymentRequest.invoiceLines[1].fundCode).toBe('DRD10')
  })

  test('should retain currency if present', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.currency).toBe('EUR')
  })

  test('should add default GBP currency if not present', async () => {
    delete paymentRequest.currency
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.currency).toBe(GBP)
  })
})
