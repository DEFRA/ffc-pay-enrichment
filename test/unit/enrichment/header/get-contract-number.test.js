const { FC } = require('../../../../app/constants/schemes')

const { getContractNumber } = require('../../../../app/enrichment/header/get-contract-number')

let paymentRequest

describe('get contract number', () => {
  beforeEach(() => {
    paymentRequest = {}
  })

  test('should return contract number if payment request has contract number and scheme is not FC', () => {
    paymentRequest.contractNumber = '123456'
    const result = getContractNumber(paymentRequest)
    expect(result).toBe(paymentRequest.contractNumber)
  })

  test('should return undefined if payment request does not have contract number and scheme is not FC', () => {
    const result = getContractNumber(paymentRequest)
    expect(result).toBeUndefined()
  })

  test('should return second segment of invoice number if FC', () => {
    paymentRequest.invoiceNumber = '1234 56'
    paymentRequest.schemeId = FC
    const result = getContractNumber(paymentRequest)
    expect(result).toBe('56')
  })

  test('should return full invoice number if FC and no second segment', () => {
    paymentRequest.invoiceNumber = '123456'
    paymentRequest.schemeId = FC
    const result = getContractNumber(paymentRequest)
    expect(result).toBe(paymentRequest.invoiceNumber)
  })
})
