const {
  SFI,
  SFI_PILOT,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR,
  MANUAL,
  ES
} = require('./schemes')

const {
  SFI: SFI_SOURCE,
  SFIP,
  LSES,
  AHWR,
  SITI_AGRI_CS_SYS,
  SITI_AGRI_SYS,
  FDMR: FDMR_SOURCE,
  MANUAL: MANUAL_SOURCE,
  Genesis
} = require('./source-systems')

const {
  RP00,
  NE00
} = require('./delivery-bodies')

const {
  DRD10,
  DOM10,
  ERD14,
  EGF00,
  EXQ00
} = require('./fund-codes')

module.exports = [
  { schemeId: SFI, sourceSystem: SFI_SOURCE, deliveryBody: RP00, fundCode: DRD10 },
  { schemeId: SFI_PILOT, sourceSystem: SFIP, deliveryBody: RP00, fundCode: DRD10 },
  { schemeId: LUMP_SUMS, sourceSystem: LSES, deliveryBody: RP00, fundCode: DOM10 },
  { schemeId: VET_VISITS, sourceSystem: AHWR, deliveryBody: RP00, fundCode: DOM10 },
  { schemeId: CS, sourceSystem: SITI_AGRI_CS_SYS, deliveryBody: NE00, fundCode: ERD14 },
  { schemeId: BPS, sourceSystem: SITI_AGRI_SYS, deliveryBody: RP00, fundCode: EGF00 },
  { schemeId: FDMR, sourceSystem: FDMR_SOURCE, deliveryBody: RP00, fundCode: EGF00 },
  { schemeId: MANUAL, sourceSystem: MANUAL_SOURCE, deliveryBody: RP00, fundCode: DOM10 },
  { schemeId: ES, sourceSystem: Genesis, deliveryBody: NE00, fundCode: EXQ00 }
]