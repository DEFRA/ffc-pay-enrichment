const { getMarketingYear } = require('../../../../app/enrichment/es/get-marketing-year')

describe('get ES marketing year', () => {
  test('should return undefined if sub account code is 0', () => {
    const result = getMarketingYear('0')
    expect(result).toBeUndefined()
  })

  test('should return 2000 if sub account code is 1 digit', () => {
    const result = getMarketingYear('1')
    expect(result).toBe(2000)
  })

  test.each([
    '990',
    '991',
    '992',
    '993',
    '994',
    '995',
    '996',
    '997',
    '998',
    '999'
  ])('should return 1999 for 1999 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(1999)
  })

  test.each([
    '010',
    '011',
    '012',
    '013',
    '014',
    '015',
    '016',
    '017',
    '018',
    '019'
  ])('should return 2001 for 2001 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2001)
  })

  test.each([
    '020',
    '021',
    '022',
    '023',
    '024',
    '025',
    '026',
    '027',
    '028',
    '029'
  ])('should return 2002 for 2002 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2002)
  })

  test.each([
    '030',
    '031',
    '032',
    '033',
    '034',
    '035',
    '036',
    '037',
    '038',
    '039'
  ])('should return 2003 for 2003 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2003)
  })

  test.each([
    '040',
    '041',
    '042',
    '043',
    '044',
    '045',
    '046',
    '047',
    '048',
    '049'
  ])('should return 2004 for 2004 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2004)
  })

  test.each([
    '050',
    '051',
    '052',
    '053',
    '054',
    '055',
    '056',
    '057',
    '058',
    '059'
  ])('should return 2005 for 2005 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2005)
  })

  test.each([
    '060',
    '061',
    '062',
    '063',
    '064',
    '065',
    '066',
    '067',
    '068',
    '069'
  ])('should return 2006 for 2006 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2006)
  })

  test.each([
    '070',
    '071',
    '072',
    '073',
    '074',
    '075',
    '076',
    '077',
    '078',
    '079'
  ])('should return 2007 for 2007 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2007)
  })

  test.each([
    '080',
    '081',
    '082',
    '083',
    '084',
    '085',
    '086',
    '087',
    '088',
    '089'
  ])('should return 2008 for 2008 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2008)
  })

  test.each([
    '090',
    '091',
    '092',
    '093',
    '094',
    '095',
    '096',
    '097',
    '098',
    '099'
  ])('should return 2009 for 2009 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2009)
  })

  test.each([
    '100',
    '101',
    '102',
    '103',
    '104',
    '105',
    '106',
    '107',
    '108',
    '109'
  ])('should return 2010 for 2010 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2010)
  })

  test.each([
    '110',
    '111',
    '112',
    '113',
    '114',
    '115',
    '116',
    '117',
    '118',
    '119'
  ])('should return 2011 for 2011 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2011)
  })

  test.each([
    '120',
    '121',
    '122',
    '123',
    '124',
    '125',
    '126',
    '127',
    '128',
    '129'
  ])('should return 2012 for 2012 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2012)
  })

  test.each([
    '130',
    '131',
    '132',
    '133',
    '134',
    '135',
    '136',
    '137',
    '138',
    '139'
  ])('should return 2013 for 2013 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2013)
  })

  test.each([
    '140',
    '141',
    '142',
    '143',
    '144',
    '145',
    '146',
    '147',
    '148',
    '149'
  ])('should return 2014 for 2014 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2014)
  })

  test.each([
    '150',
    '151',
    '152',
    '153',
    '154',
    '155',
    '156',
    '157',
    '158',
    '159'
  ])('should return 2015 for 2015 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2015)
  })

  test.each([
    '160',
    '161',
    '162',
    '163',
    '164',
    '165',
    '166',
    '167',
    '168',
    '169'
  ])('should return 2016 for 2016 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2016)
  })

  test.each([
    '170',
    '171',
    '172',
    '173',
    '174',
    '175',
    '176',
    '177',
    '178',
    '179'
  ])('should return 2017 for 2017 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2017)
  })

  test.each([
    '180',
    '181',
    '182',
    '183',
    '184',
    '185',
    '186',
    '187',
    '188',
    '189'
  ])('should return 2018 for 2018 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2018)
  })

  test.each([
    '190',
    '191',
    '192',
    '193',
    '194',
    '195',
    '196',
    '197',
    '198',
    '199'
  ])('should return 2019 for 2019 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2019)
  })

  test.each([
    '200',
    '201',
    '202',
    '203',
    '204',
    '205',
    '206',
    '207',
    '208',
    '209'
  ])('should return 2020 for 2020 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2020)
  })

  test.each([
    '210',
    '211',
    '212',
    '213',
    '214',
    '215',
    '216',
    '217',
    '218',
    '219'
  ])('should return 2021 for 2021 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2021)
  })

  test.each([
    '220',
    '221',
    '222',
    '223',
    '224',
    '225',
    '226',
    '227',
    '228',
    '229'
  ])('should return 2022 for 2022 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2022)
  })

  test.each([
    '230',
    '231',
    '232',
    '233',
    '234',
    '235',
    '236',
    '237',
    '238',
    '239'
  ])('should return 2023 for 2023 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2023)
  })

  test.each([
    '240',
    '241',
    '242',
    '243',
    '244',
    '245',
    '246',
    '247',
    '248',
    '249'
  ])('should return 2024 for 2024 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2024)
  })

  test.each([
    '250',
    '251',
    '252',
    '253',
    '254',
    '255',
    '256',
    '257',
    '258',
    '259'
  ])('should return 2025 for 2025 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2025)
  })

  test.each([
    '260',
    '261',
    '262',
    '263',
    '264',
    '265',
    '266',
    '267',
    '268',
    '269'
  ])('should return 2026 for 2026 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2026)
  })

  test.each([
    '270',
    '271',
    '272',
    '273',
    '274',
    '275',
    '276',
    '277',
    '278',
    '279'
  ])('should return 2027 for 2027 sub account codes', (subAccountCode) => {
    const result = getMarketingYear(subAccountCode)
    expect(result).toBe(2027)
  })
})
