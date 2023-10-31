const { GBP } = require('../../app/constants/currency')
const { AP } = require('../../app/constants/ledgers')
const { M12 } = require('../../app/constants/schedules')

const db = require('../../app/data')

const { enrichPaymentRequest } = require('../../app/enrichment')

let paymentRequest
let customer

describe('enrich payment request', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    customer = {
      referenceType: 'sbi',
      reference: 123456789,
      frn: 1234567890
    }

    paymentRequest = {
      sourceSystem: 'SFI',
      deliveryBody: 'RP00',
      sbi: 123456789,
      paymentRequestNumber: 1,
      invoiceNumber: 'SFIP0695764',
      agreementNumber: 'SIP00000000001',
      contractNumber: 'SFIP000001',
      marketingYear: 2022,
      currency: 'EUR',
      schedule: M12,
      dueDate: '2021-08-15',
      value: 150.00,
      invoiceLines: [
        {
          schemeCode: '80001',
          agreementNumber: 'SIP00000000001',
          description: 'G00 - Gross value of claim',
          value: 250.00
        },
        {
          schemeCode: '80001',
          agreementNumber: 'SIP00000000001',
          description: 'P02 - Over declaration penalty',
          value: -100.00
        }
      ]
    }

    await db.customer.create(customer)
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

  test('should add contract number as agreement number if not present', async () => {
    delete paymentRequest.agreementNumber
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.agreementNumber).toBe(paymentRequest.contractNumber)
  })

  test('should set recoveryDate as undefined if not recoveryDate not present', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.recoveryDate).toBe(undefined)
  })

  test('should convert recoveryDate to DAX format if recoveryDate present', async () => {
    paymentRequest.recoveryDate = '2023-10-24'
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.recoveryDate).toBe('24/10/2023')
  })

  test('should set originalSettlementDate as undefined if not originalSettlementDate not present', async () => {
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.originalSettlementDate).toBe(undefined)
  })

  test('should convert originalSettlementDate to DAX format if originalSettlementDate present', async () => {
    paymentRequest.originalSettlementDate = '2023-10-24'
    await enrichPaymentRequest(paymentRequest)
    expect(paymentRequest.originalSettlementDate).toBe('24/10/2023')
  })
})
