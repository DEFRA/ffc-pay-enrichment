const { BPS } = require('../constants/schemes')
const { convertToDaxDate } = require('../date-convert')

const confirmDueDate = (schemeId, marketingYear, dueDate) => {
  if (schemeId === BPS) {
    dueDate = `${marketingYear}-12-01`
  }
  return convertToDaxDate(dueDate)
}

module.exports = {
  confirmDueDate
}
