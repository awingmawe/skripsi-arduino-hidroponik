const { Lokasi } = require("../models");

module.exports = {
  // Insert Lokasi
  insertLokasi(namaLokasi) {
    Lokasi.create({
      namaLokasi: namaLokasi,
    });
  },
};
