"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NodeSensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NodeSensor.hasMany(models.Sensing, {
        foreignKey: "idNode",
      });
      // models.Sensing.belongsTo(NodeSensor);
    }
  }
  NodeSensor.init(
    {
      namaNode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NodeSensor",
    }
  );
  return NodeSensor;
};
