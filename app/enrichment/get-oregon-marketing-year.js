const oregonMarketingYears = require('../constants/oregon-marketing-years')

const getOregonMarketingYear = (subAccountCode) => {
  const parsedSubAccountCode = parseInt(subAccountCode)
  return oregonMarketingYears.find(x => x.from <= parsedSubAccountCode && x.to >= parsedSubAccountCode)?.marketingYear
}

module.exports = {
  getOregonMarketingYear
}
