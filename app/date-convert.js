const moment = require('moment')

const convertToDaxDate = (dateString) => {
  return dateString ? formatDate(dateString) : getCurrentDate()
}

const getCurrentDate = () => {
  return moment().format('DD/MM/YYYY')
}

const formatDate = (dateString) => {
  try {
    const date = moment(dateString, ['YYYY-MM-DD', 'DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD'], true)
    return date.isValid() ? date.format('DD/MM/YYYY') : undefined
  } catch {
    return undefined
  }
}

module.exports = {
  convertToDaxDate
}
