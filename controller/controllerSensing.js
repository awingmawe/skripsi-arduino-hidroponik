const { Sensing } = require("../models");

module.exports = {
  // Insert data sensing ke database
  insertSensing(data) {
    Sensing.create({
      idNode: data.idNode,
      idLokasi: data.idLokasi,
      phAir: data.phAir,
      suhuAir: data.suhuAir,
      humidity: data.humidity,
      status: data.status,
    });
  },

  // Kirim data sensing ke website
  getAllSensing(req, res) {
    Sensing.findAll({}).then((data) => {
      // res.header(
      //   "Access-Control-Allow-Origin",
      //   "http://localhost:8000/sensing"
      // ); // update to match the domain you will make the request from
      // res.header(
      //   "Access-Control-Allow-Headers",
      //   "Origin, X-Requested-With, Content-Type, Accept"
      // );
      res.status(200).json(data);
    });
  },
};
