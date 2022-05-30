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
      phAir: DataTypes.FLOAT,
      humidity: DataTypes.FLOAT,
      suhuAir: DataTypes.FLOAT,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Sensing",
    }
  );
  return Sensing;
};
