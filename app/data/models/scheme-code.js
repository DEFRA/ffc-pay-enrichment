module.exports = (sequelize, DataTypes) => {
  return sequelize.define('schemeCode', {
    schemeCodeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    standardCode: DataTypes.STRING,
    schemeCode: DataTypes.STRING
  },
  {
    tableName: 'schemeCodes',
    freezeTableName: true,
    timestamps: false
  })
}
