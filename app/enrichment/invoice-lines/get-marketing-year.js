const getMarketingYear = (invoiceLine, defaultMarketingYear) => {
  if (invoiceLine.marketingYear === -1) {
    return
  }
  return invoiceLine.marketingYear ?? defaultMarketingYear
}

module.exports = {
  getMarketingYear
}
