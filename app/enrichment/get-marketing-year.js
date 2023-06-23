const getMarketingYear = (invoiceLine, defaultMarketingYear) => {
  return invoiceLine.marketingYear ?? defaultMarketingYear
}

module.exports = {
  getMarketingYear
}
