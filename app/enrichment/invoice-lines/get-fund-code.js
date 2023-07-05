const getFundCode = (invoiceLine, defaultFundCode) => {
  return invoiceLine.fundCode ?? defaultFundCode
}

module.exports = {
  getFundCode
}
