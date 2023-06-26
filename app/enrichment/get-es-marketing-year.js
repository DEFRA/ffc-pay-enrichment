const getESMarketingYear = (subAccountCode) => {
  if (parseInt(subAccountCode) === 0) {
    return
  }
  if (subAccountCode.length === 1) {
    return 2000
  }
  return Number(`20${subAccountCode.substring(0, subAccountCode.length - 1)}`)
}

module.exports = {
  getESMarketingYear
}
