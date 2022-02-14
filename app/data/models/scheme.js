module.exports = (sequelize, DataTypes) => {
  return sequelize.define('scheme', {
    schemeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    sourceSystem: DataTypes.STRING,
    deliveryBody: DataTypes.STRING,
    fundCode: DataTypes.STRING
  },
  {
    tableName: 'schemes',
    freezeTableName: true,
    timestamps: false
  })
}
