const moment = require('moment')

const convertToDaxDate = (dateString) => {
  if (!dateString) {
    return getCurrentDate()
  }
  return dateString.includes('/') ? dateString : formatDate(dateString)
}

const getCurrentDate = () => {
  return moment(new Date(), 'DD/MM/YYYY')
}

const formatDate = (dateString) => {
  const dateParts = dateString.split('-')
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
}

module.exports = {
  convertToDaxDate
}
