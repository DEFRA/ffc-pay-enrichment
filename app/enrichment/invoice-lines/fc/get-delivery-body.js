const { FC00, FC99 } = require('../../../constants/delivery-bodies')
const { _028Q031Q, _028E031Q } = require('../../../constants/standard-codes')

const getDeliveryBody = (standardCode) => {
  if ([_028Q031Q, _028E031Q].includes(standardCode)) {
    return FC99
  }
  return FC00
}

module.exports = {
  getDeliveryBody
}
