const controllerLokasi = require("./controllerLokasi");
const controllerNode = require("./controllerNode");
const controllerSensing = require("./controllerSensing");

module.exports = {
  node: controllerNode,
  lokasi: controllerLokasi,
  sensing: controllerSensing,
};
