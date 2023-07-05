const { _062EWCG } = require('../../../constants/standard-codes')

const getMarketingYear = (standardCode) => {
  if (standardCode === _062EWCG) {
    return 2021
  }
  return 2015
}

module.exports = {
  getMarketingYear
}
