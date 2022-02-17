const { convertToDaxDate } = require('../../app/date-convert')

describe('convert currency', () => {
  test('does not change if already DAX format', () => {
    const result = convertToDaxDate('01/11/2021')
    expect(result).toEqual('01/11/2021')
  })

  test('update Siti Agri to DAX format', () => {
    const result = convertToDaxDate('2021-11-01')
    expect(result).toEqual('01/11/2021')
  })
})
