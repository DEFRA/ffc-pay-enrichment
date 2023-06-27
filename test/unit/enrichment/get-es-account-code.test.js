const { SOS228, SOS229, SOS710 } = require('../../../app/constants/account-codes')
const { getESAccountCode } = require('../../../app/enrichment/get-es-account-code')

describe('get ES account code', () => {
  test.each([
    ['0521', SOS228],
    ['0532', SOS228],
    ['0533', SOS228]
  ])('should return SOS228 state aid code for state aid', (accountCode, expected) => {
    const result = getESAccountCode(accountCode)
    expect(result).toBe(expected)
  })

  test('should return SOS229 state aid code for state aid', () => {
    const result = getESAccountCode('0569')
    expect(result).toBe(SOS229)
  })

  test('should return SOS710 if not state aid', () => {
    const result = getESAccountCode('0000')
    expect(result).toBe(SOS710)
  })
})
