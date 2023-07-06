const moment = require('moment')
const { DAX_DATE_FORMAT, SITI_AGRI_DATE_FORMAT } = require('./constants/date-formats')

const convertToDaxDate = (dateString, useDefaultDate = true) => {
  if (useDefaultDate) {
    return dateString ? formatDate(dateString) : getCurrentDate()
  }
  return dateString ? formatDate(dateString) : undefined
}

const getCurrentDate = () => {
  return moment().format(DAX_DATE_FORMAT)
}

const formatDate = (dateString) => {
  try {
    const date = moment(dateString, [DAX_DATE_FORMAT, SITI_AGRI_DATE_FORMAT, 'DD-MM-YYYY', 'YYYY/MM/DD', 'DD-MMM-YY', 'DD/MM/YYYY HH:mm:ss'], true)
    return date.isValid() ? date.format(DAX_DATE_FORMAT) : undefined
  } catch {
    return undefined
  }
}

module.exports = {
  convertToDaxDate
}
