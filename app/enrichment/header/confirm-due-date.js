const moment = require('moment')
const { BPS, CS } = require('../../constants/schemes')
const { SITI_AGRI_DATE_FORMAT } = require('../../constants/date-formats')
const { convertToDaxDate } = require('../../date-convert')

const confirmDueDate = (schemeId, marketingYear, dueDate) => {
  if (schemeId === BPS) {
    dueDate = `${marketingYear}-12-01`
  }
  if ([BPS, CS].includes(schemeId)) {
    const currentDate = moment().startOf('day')
    const dateAsMoment = moment(dueDate, [SITI_AGRI_DATE_FORMAT], true)
    if (dateAsMoment.isValid()) {
      if (dateAsMoment.isBefore(currentDate)) {
        dueDate = currentDate.format(SITI_AGRI_DATE_FORMAT)
      }
    } else {
      throw new Error('Invalid due date format provided')
    }
  }
  return convertToDaxDate(dueDate)
}

module.exports = {
  confirmDueDate
}
