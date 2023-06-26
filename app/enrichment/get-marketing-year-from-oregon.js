const getMarketingYearFromOregon = (oregonMarketingYear) => {
  if (oregonMarketingYear === 'NA') {
    return 'NA'
  }
  return oregonMarketingYear > 50 ? `19${oregonMarketingYear}` : `20${oregonMarketingYear}`
}

module.exports = {
  getMarketingYearFromOregon
}
