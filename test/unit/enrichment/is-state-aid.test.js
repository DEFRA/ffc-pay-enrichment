const { CS } = require('../../../app/constants/schemes')
const { EXQ00 } = require('../../../app/constants/fund-codes')
const { SOS228, SOS229 } = require('../../../app/constants/account-codes')

const { isStateAid } = require('../../../app/enrichment/is-state-aid')

let invoiceLine

describe('is state aid', () => {
  beforeEach(() => {
    invoiceLine = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/invoice-line')))
  })

  test.each([
    [EXQ00, SOS228, true],
    [EXQ00, SOS229, true],
    [EXQ00, 'SOS273', false],
    ['ERD14', SOS228, false],
    ['ERD14', SOS229, false],
    ['ERD14', 'SOS273', false],
    ['ERD14', undefined, false],
    [undefined, SOS228, false],
    [undefined, SOS229, false],
    [undefined, 'SOS273', false],
    [undefined, undefined, false],
    [null, null, false],
    [null, SOS228, false],
    [null, SOS229, false],
    [null, 'SOS273', false],
    [null, undefined, false],
    [EXQ00, null, false],
    ['ERD14', null, false]
  ])('should return %s for fund code %s and account code %s', (fundCode, accountCode, expected) => {
    invoiceLine.fundCode = fundCode
    invoiceLine.accountCode = accountCode
    expect(isStateAid(invoiceLine, CS)).toBe(expected)
  })

  test('should return false if scheme is not CS', () => {
    invoiceLine.fundCode = EXQ00
    invoiceLine.accountCode = SOS228
    expect(isStateAid(invoiceLine, 1)).toBe(false)
  })
})
