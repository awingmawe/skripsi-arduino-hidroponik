const { NodeSensor } = require("../models");

module.exports = {
  //Insert node
  insertNode(data) {
    NodeSensor.create({
      namaNode: data,
      status: true,
    });
  },

  // Find node by Name
  findNodeByName(nama) {
    NodeSensor.findOne({
      where: {
        namaNode: nama,
      },
    }).then((e) => {
      if (e) {
        console.log(`Node ${nama} sudah ada!`);
      } else {
        console.log(`Berhasil menambahkan Node ${nama}`);
      }
    });
  },

  // Find all node
  getAllNode(req, res) {
    NodeSensor.findAll({}).then((data) => {
      res.status(200).json(data);
    });
  },
};
