const { NodeSensor } = require("../models");

module.exports = {
  //Insert node
  insertNode(data) {
    NodeSensor.create({
      namaNode: data,
    });
  },

  //Find node by ID
  //   findNodeByID(){
  //       NodeSensor.findByID({})
  //   }
};
