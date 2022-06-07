const moment = require('moment')
const { DAX_DATE_FORMAT, SITI_AGRI_DATE_FORMAT } = require('./date-formats')

const convertToDaxDate = (dateString) => {
  return dateString ? formatDate(dateString) : getCurrentDate()
}

const getCurrentDate = () => {
  return moment().format(DAX_DATE_FORMAT)
}

const formatDate = (dateString) => {
  try {
    const date = moment(dateString, [DAX_DATE_FORMAT, SITI_AGRI_DATE_FORMAT, 'DD-MM-YYYY', 'YYYY/MM/DD'], true)
    return date.isValid() ? date.format(DAX_DATE_FORMAT) : undefined
  } catch {
    return undefined
  }
}

module.exports = {
  convertToDaxDate
}
