const db = require('../data')

const getFrn = async (sbi, transaction) => {
  if (sbi) {
    try {
      const frn = await db.frn.findOne({ where: { sbi } }, { transaction })
      return frn ? Number(frn.frn) : undefined
    } catch {
      return undefined
    }
  }
}

module.exports = {
  getFrn
}
