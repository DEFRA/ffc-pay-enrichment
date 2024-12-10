const {
  SFI,
  SFI_PILOT,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR,
  MANUAL,
  ES,
  FC,
  IMPS,
  SFI23,
  DELINKED,
  SFI_EXPANDED
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
  Genesis,
  GLOS,
  IMPS: IMPS_SOURCE,
  SFIA,
  DP,
  ESFIO
} = require('./source-systems')

const {
  RP00,
  NE00,
  FC00
} = require('./delivery-bodies')

const {
  DRD10,
  DOM00,
  DOM10,
  ERD14,
  EGF00,
  EXQ00
} = require('./fund-codes')

const {
  SFI: SFI_PILLAR,
  SFIP: SFIP_PILLAR,
  LSES: LSES_PILLAR,
  AHWR: AHWR_PILLAR,
  CS: CS_PILLAR,
  BPS: BPS_PILLAR,
  FDMR: FDMR_PILLAR,
  ES: ES_PILLAR,
  FC: FC_PILLAR,
  IMPS: IMPS_PILLAR,
  SFI23: SFI23_PILLAR,
  DP: DP_PILLAR,
  ESFIO: ESFIO_PILLAR
} = require('./pillars')

module.exports = [
  { schemeId: SFI, sourceSystem: SFI_SOURCE, pillar: SFI_PILLAR, deliveryBody: RP00, fundCode: DRD10 },
  { schemeId: SFI_PILOT, sourceSystem: SFIP, pillar: SFIP_PILLAR, deliveryBody: RP00, fundCode: DRD10 },
  { schemeId: LUMP_SUMS, sourceSystem: LSES, pillar: LSES_PILLAR, deliveryBody: RP00, fundCode: DOM10 },
  { schemeId: VET_VISITS, sourceSystem: AHWR, pillar: AHWR_PILLAR, deliveryBody: RP00, fundCode: DOM10 },
  { schemeId: CS, sourceSystem: SITI_AGRI_CS_SYS, pillar: CS_PILLAR, deliveryBody: NE00, fundCode: ERD14 },
  { schemeId: BPS, sourceSystem: SITI_AGRI_SYS, pillar: BPS_PILLAR, deliveryBody: RP00, fundCode: EGF00 },
  { schemeId: FDMR, sourceSystem: FDMR_SOURCE, pillar: FDMR_PILLAR, deliveryBody: RP00, fundCode: EGF00 },
  { schemeId: MANUAL, sourceSystem: MANUAL_SOURCE, deliveryBody: RP00, fundCode: DRD10 },
  { schemeId: ES, sourceSystem: Genesis, pillar: ES_PILLAR, deliveryBody: NE00, fundCode: EXQ00 },
  { schemeId: FC, sourceSystem: GLOS, pillar: FC_PILLAR, deliveryBody: FC00, fundCode: DOM00 },
  { schemeId: IMPS, sourceSystem: IMPS_SOURCE, pillar: IMPS_PILLAR, deliveryBody: RP00, fundCode: DOM00 },
  { schemeId: SFI23, sourceSystem: SFIA, pillar: SFI23_PILLAR, deliveryBody: RP00, fundCode: DRD10 },
  { schemeId: DELINKED, sourceSystem: DP, pillar: DP_PILLAR, deliveryBody: RP00, fundCode: DOM10 },
  { schemeId: SFI_EXPANDED, sourceSystem: ESFIO, pillar: ESFIO_PILLAR, deliveryBody: RP00, fundCode: DRD10 }
]
