const { SFI } = require('../../app/constants/schemes')
const { FUND_CODE } = require('./values/fund-code')
const { DELIVERY_BODY_RPA } = require('./values/delivery-body')

module.exports = {
  schemeId: SFI,
  fundCode: FUND_CODE,
  deliveryBody: DELIVERY_BODY_RPA
}
