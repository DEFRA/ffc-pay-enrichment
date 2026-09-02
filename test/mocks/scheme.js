const { getSchemeIds } = require('ffc-pay-schemes')
const { FUND_CODE } = require('./values/fund-code')
const { DELIVERY_BODY_RPA } = require('./values/delivery-body')

const { SFI } = getSchemeIds()

module.exports = {
  schemeId: SFI,
  fundCode: FUND_CODE,
  deliveryBody: DELIVERY_BODY_RPA
}
