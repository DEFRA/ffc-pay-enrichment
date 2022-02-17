const createInvoiceNumber = require('../../../app/enrichment/create-invoice-number')

const paymentRequest = {
  sourceSystem: 'SFIP',
  deliveryBody: 'RP00',
  invoiceNumber: 'SFIP0695764',
  frn: 1234567890,
  sbi: 123456789,
  paymentRequestNumber: 1,
  agreementNumber: 'SIP00000000000011',
  contractNumber: 'S1248977',
  marketingYear: 2022,
  currency: 'GBP',
  schedule: 'M12',
  dueDate: '2021-08-15',
  value: 400.00
}

describe('generate invoice number', () => {
  test('generate invoice number from invoice number', () => {
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0695764S1248977V001')
  })

  test('generate invoice number from agreement number', () => {
    paymentRequest.invoiceNumber = ''
    const result = createInvoiceNumber(paymentRequest)
    expect(result).toEqual('S0000011S1248977V001')
  })
})
