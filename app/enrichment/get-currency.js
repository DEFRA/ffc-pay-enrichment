const { GBP } = require('../constants/currency')

const getCurrency = (currency) => {
  return currency ?? GBP
}

module.exports = {
  getCurrency
}
