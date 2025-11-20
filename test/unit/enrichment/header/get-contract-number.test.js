const { FC } = require('../../../../app/constants/schemes')
const { getContractNumber } = require('../../../../app/enrichment/header/get-contract-number')

describe('getContractNumber', () => {
  let paymentRequest

  beforeEach(() => {
    paymentRequest = {}
  })

  test('returns contract number if scheme is not FC', () => {
    paymentRequest.contractNumber = '123456'
    expect(getContractNumber(paymentRequest)).toBe('123456')
  })

  test('returns undefined if no contract number and scheme is not FC', () => {
    expect(getContractNumber(paymentRequest)).toBeUndefined()
  })

  describe('when scheme is FC', () => {
    beforeEach(() => {
      paymentRequest.schemeId = FC
    })

    test('returns second segment of invoice number if space exists', () => {
      paymentRequest.invoiceNumber = '1234 56'
      expect(getContractNumber(paymentRequest)).toBe('56')
    })

    test('returns full invoice number if no second segment', () => {
      paymentRequest.invoiceNumber = '123456'
      expect(getContractNumber(paymentRequest)).toBe('123456')
    })
  })
})
