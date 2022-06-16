const createMessage = (body, type, options) => {
  return {
    body,
    type,
    source: 'ffc-pay-enrichment',
    ...options
  }
}

module.exports = createMessage
