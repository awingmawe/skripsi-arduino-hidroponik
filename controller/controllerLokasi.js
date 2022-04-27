const { Lokasi } = require("../models");

module.exports = {
  // Insert Lokasi
  insertLokasi(namaLokasi) {
    Lokasi.create({
      namaLokasi: namaLokasi,
    });
  },
  // Find lokasi by name
  findLokasiByName(nama) {
    Lokasi.findOne({
      where: {
        namaLokasi: nama,
      },
    });
  },
};
