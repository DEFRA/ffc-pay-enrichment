const db = require('../data')

const getFrn = async (sbi, transaction) => {
  if (sbi) {
    const frn = await db.frn.findOne({ where: { sbi } }, { transaction })
    return frn ? Number(frn.frn) : undefined
  }
}

module.exports = getFrn
