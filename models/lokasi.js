"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lokasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lokasi.hasMany(models.Sensing, {
        foreignKey: "idLokasi",
      });
      // models.Sensing.belongsTo(Lokasi);
    }
  }
  Lokasi.init(
    {
      namaLokasi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Lokasi",
    }
  );
  return Lokasi;
};
