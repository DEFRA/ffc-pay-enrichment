const TABLES = require('../../../app/constants/tables')
const { PRIMARY_KEYS, COLUMNS, pickColumns } = require('../../../app/constants/columns')

describe('pickColumns', () => {
  test('keeps properties that are columns on the table', () => {
    const record = { referenceType: 1, reference: 'value' }

    expect(pickColumns(record, TABLES.customers)).toEqual(record)
  })

  test('drops properties that are not columns on the table', () => {
    const result = pickColumns({ referenceType: 1, notAColumn: 'value' }, TABLES.customers)

    expect(result).toEqual({ referenceType: 1 })
  })

  test('drops the primary key', () => {
    const result = pickColumns({ id: 1, referenceType: 1 }, TABLES.customers)

    expect(result).toEqual({ referenceType: 1 })
  })

  test('returns an empty object when given no properties', () => {
    expect(pickColumns({}, TABLES.customers)).toEqual({})
  })
})

describe('PRIMARY_KEYS', () => {
  test('each primary key is a column on its table', () => {
    for (const [table, primaryKey] of Object.entries(PRIMARY_KEYS)) {
      expect(COLUMNS[table]).toContain(primaryKey)
    }
  })
})
