const convertToDaxDate = (dateString) => {
  return dateString.includes('/') ? dateString : formatDate(dateString)
}

const formatDate = (dateString) => {
  const dateParts = dateString.split('-')
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
}

module.exports = {
  convertToDaxDate
}
