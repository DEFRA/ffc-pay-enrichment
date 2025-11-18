const { GBP } = require('../../app/constants/currency')
const { AP } = require('../../app/constants/ledgers')
const { M12 } = require('../../app/constants/schedules')
const db = require('../../app/data')
const { enrichPaymentRequest } = require('../../app/enrichment')

let paymentRequest
let customer

describe('enrichPaymentRequest', () => {
  beforeEach(async () => {
    await db.sequelize.truncate({ cascade: true })

    customer = { referenceType: 'sbi', reference: 123456789, frn: 1234567890 }
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
      value: 150.0,
      invoiceLines: [
        { schemeCode: '80001', agreementNumber: 'SIP00000000001', description: 'G00 - Gross value of claim', value: 250.0 },
        { schemeCode: '80001', agreementNumber: 'SIP00000000001', description: 'P02 - Over declaration penalty', value: -100.0 }
      ]
    }

    await db.customer.create(customer)
  })

  afterAll(async () => {
    await db.sequelize.truncate({ cascade: true })
    await db.sequelize.close()
  })

  describe('validation errors', () => {
    test.each([{}, undefined, null, [], '', false, true, 0, 1])(
      'throws validation error for invalid input %p',
      async (input) => {
        await expect(enrichPaymentRequest(input))
          .rejects.toMatchObject({ category: 'validation' })
      }
    )

    test('throws error if invoiceLines missing', async () => {
      delete paymentRequest.invoiceLines
      await expect(enrichPaymentRequest(paymentRequest))
        .rejects.toMatchObject({ category: 'validation' })
    })
  })

  describe('enrichment', () => {
    beforeEach(async () => {
      await enrichPaymentRequest(paymentRequest)
    })

    test('adds frn, schemeId, ledger, deliveryBody', () => {
      expect(paymentRequest.frn).toBe(1234567890)
      expect(paymentRequest.schemeId).toBe(1)
      expect(paymentRequest.ledger).toBe(AP)
      expect(paymentRequest.deliveryBody).toBe('RP00')
    })

    test('transforms value to pence', () => {
      expect(paymentRequest.value).toBe(15000)
    })

    test('adds schemeCodes and fundCodes to invoiceLines', () => {
      paymentRequest.invoiceLines.forEach(line => {
        expect(line.schemeCode).toBe('80001')
        expect(line.fundCode).toBe('DRD10')
      })
    })

    test('retains currency if present or adds GBP if missing', async () => {
      expect(paymentRequest.currency).toBe('EUR')
      delete paymentRequest.currency
      await enrichPaymentRequest(paymentRequest)
      expect(paymentRequest.currency).toBe(GBP)
    })

    test('sets agreementNumber from contractNumber if missing', async () => {
      delete paymentRequest.agreementNumber
      await enrichPaymentRequest(paymentRequest)
      expect(paymentRequest.agreementNumber).toBe(paymentRequest.contractNumber)
    })

    test('handles recoveryDate correctly', async () => {
      expect(paymentRequest.recoveryDate).toBeUndefined()
      paymentRequest.recoveryDate = '2023-10-24'
      await enrichPaymentRequest(paymentRequest)
      expect(paymentRequest.recoveryDate).toBe('24/10/2023')
    })

    test('handles originalSettlementDate correctly', async () => {
      expect(paymentRequest.originalSettlementDate).toBeUndefined()
      paymentRequest.originalSettlementDate = '2023-10-24'
      await enrichPaymentRequest(paymentRequest)
      expect(paymentRequest.originalSettlementDate).toBe('24/10/2023')
    })
  })
})
