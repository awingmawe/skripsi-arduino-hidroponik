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

  // Find all node
  getAllNode(req, res) {
    NodeSensor.findAll({}).then((data) => {
      res.status(200).json(data);
    });
  },
};
