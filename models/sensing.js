"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sensing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sensing.belongsTo(models.NodeSensor, {
        foreignKey: "idNode",
      });
      Sensing.belongsTo(models.Lokasi, {
        foreignKey: "idLokasi",
      });
    }
  }
  Sensing.init(
    {
      idNode: DataTypes.INTEGER,
      idLokasi: DataTypes.INTEGER,
      kelarutan: DataTypes.FLOAT,
      phAir: DataTypes.FLOAT,
      suhuUdara: DataTypes.FLOAT,
      humidity: DataTypes.FLOAT,
      suhuAir: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Sensing",
    }
  );
  return Sensing;
};
