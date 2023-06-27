module.exports = (sequelize, DataTypes) => {
  return sequelize.define('frn', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    referenceType: DataTypes.STRING,
    reference: DataTypes.STRING,
    frn: DataTypes.BIGINT
  },
  {
    tableName: 'customers',
    freezeTableName: true,
    timestamps: false
  })
}
