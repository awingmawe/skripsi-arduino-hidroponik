const { NodeSensor } = require("../models");

module.exports = {
  //Insert node
  insertNode(data) {
    NodeSensor.create({
      namaNode: data,
    });
  },

  // Find node by Name
  findNodeByName(nama) {
    NodeSensor.findOne({
      where: {
        namaNode: nama,
      },
    });
  },
};
