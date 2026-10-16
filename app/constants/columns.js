const TABLES = require('./tables')

const PRIMARY_KEYS = {
  [TABLES.customers]: 'id'
}

const COLUMNS = {
  [TABLES.customers]: [
    'id',
    'referenceType',
    'reference',
    'frn'
  ]
}

const pickColumns = (record, table) => {
  return Object.fromEntries(
    Object.entries(record)
      .filter(([column]) => COLUMNS[table].includes(column))
      .filter(([column]) => column !== PRIMARY_KEYS[table])
  )
}

module.exports = {
  PRIMARY_KEYS,
  COLUMNS,
  pickColumns
}
