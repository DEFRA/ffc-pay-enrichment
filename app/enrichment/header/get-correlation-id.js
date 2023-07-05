const { v4: uuidv4 } = require('uuid')

const getCorrelationId = (correlationId) => {
  return correlationId ?? uuidv4()
}

module.exports = {
  getCorrelationId
}
