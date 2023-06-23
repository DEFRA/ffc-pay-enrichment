module.exports = (sequelize, DataTypes) => {
  return sequelize.define('frn', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sbi: DataTypes.INTEGER,
    vendor: DataTypes.STRING,
    frn: DataTypes.BIGINT
  },
  {
    tableName: 'frns',
    freezeTableName: true,
    timestamps: false
  })
}
