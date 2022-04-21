const { Sensing } = require("../models");

module.exports = {
  // Insert data sensing ke database
  insertSensing(data) {
    Sensing.create({
      idNode: data.idNode,
      idLokasi: data.idLokasi,
    });
  },
};
