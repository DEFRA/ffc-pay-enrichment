const getMarketingYear = (subAccountCode) => {
  if (parseInt(subAccountCode) === 0) {
    return
  }
  if (subAccountCode.length === 1) {
    return 2000
  }
  const year = parseInt(subAccountCode.substring(0, subAccountCode.length - 1))
  if (year < 90) {
    return 2000 + year
  }
  return 1900 + year
}

module.exports = {
  getMarketingYear
}
