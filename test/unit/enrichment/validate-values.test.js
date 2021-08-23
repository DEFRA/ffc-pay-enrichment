const validateValues = require('../../../app/enrichment/validate-values')

describe('validate value', () => {
  test('does not error if value equals lines with one line', () => {
    const lines = [{
      value: 100
    }]
    expect(()=>validateValues(100, lines)).not.toThrow()
  })

  test('does not error if value equals lines with multiple lines', () => {
    const lines = [{
      value: 50
    }, {
      value: 50
    }]
    expect(()=>validateValues(100, lines)).not.toThrow()
  })

  test('does not error if net 0', () => {
    const lines = [{
      value: 50
    }, {
      value: -50
    }]
    expect(()=>validateValues(0, lines)).not.toThrow()
  })

  test('does not error if value equals lines with positive and negative', () => {
    const lines = [{
      value: 100
    }, {
      value: -50
    }]
    expect(()=>validateValues(50, lines)).not.toThrow()
  })

  test('does not error if value equals lines with negative', () => {
    const lines = [{
      value: -100
    }]
    expect(()=>validateValues(-100, lines)).not.toThrow()
  })

  test('does not error if value equals lines with negative and multiple lines', () => {
    const lines = [{
      value: -100
    }, {
      value: 50
    }]
    expect(()=>validateValues(-50, lines)).not.toThrow()
  })

  test('errors if value higher', () => {
    const lines = [{
      value: 50
    }]
    expect(()=>validateValues(100, lines)).toThrow()
  })

  test('errors if value lower', () => {
    const lines = [{
      value: 150
    }]
    expect(()=>validateValues(100, lines)).toThrow()
  })

  test('errors if multiple lines', () => {
    const lines = [{
      value: 150
    }, {
      value: -100
    }]
    expect(()=>validateValues(100, lines)).toThrow()
  })
})
