const { Sensing, Lokasi, NodeSensor, sequelize } = require("../models");

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
    }).catch((err) => {
      console.log(err);
    });
  },

  // Kirim data sensing ke website
  getAllSensing(req, res) {
    Sensing.findAll({
      include: [
        {
          model: Lokasi,
        },
        {
          model: NodeSensor,
        },
      ],
    }).then((data) => {
      res.status(200).json(data);
    });
  },

  // Kirim data sensing berdasarkan node yang tersedia
  getAllSensingNode(req, res) {
    sequelize
      .query(
        `select DISTINCT ON ("namaNode") 
          c.id, 
          "namaNode", 
          "namaLokasi",
          "phAir",
          "suhuAir",
          "humidity",
          c."createdAt"
        from "Sensings" as c 
        inner join "NodeSensors" as n on c."idNode" = n.id 
        inner join "Lokasis" as l on c."idLokasi" = n.id
        order by "namaNode", c."createdAt" DESC`
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  },

  // Kirim data sensing Ph Air
  getPhAir(req, res) {
    Sensing.findAll({
      include: [
        {
          model: Lokasi,
        },
        {
          model: NodeSensor,
        },
      ],
      attributes: ["id", "phAir", "createdAt"],
    }).then((data) => {
      res.status(200).json(data);
    });
  },

  // realtime data ph air
  getSensingPhAir(req, res) {
    sequelize
      .query(
        `select DISTINCT ON ("namaNode") 
          c.id, 
          "namaNode", 
          "namaLokasi",
          "phAir",
          c."createdAt"
        from "Sensings" as c 
        inner join "NodeSensors" as n on c."idNode" = n.id 
        inner join "Lokasis" as l on c."idLokasi" = n.id
        order by "namaNode", c."createdAt" DESC`
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  },

  // Kirim data sensing Suhu Air
  getSuhuAir(req, res) {
    Sensing.findAll({
      include: [
        {
          model: Lokasi,
        },
        {
          model: NodeSensor,
        },
      ],
      attributes: ["id", "suhuAir", "createdAt"],
    }).then((data) => {
      res.status(200).json(data);
    });
  },

  // realtime data ph air
  getSensingSuhuAir(req, res) {
    sequelize
      .query(
        `select DISTINCT ON ("namaNode") 
          c.id, 
          "namaNode", 
          "namaLokasi",
          "suhuAir",
          c."createdAt"
        from "Sensings" as c 
        inner join "NodeSensors" as n on c."idNode" = n.id 
        inner join "Lokasis" as l on c."idLokasi" = n.id
        order by "namaNode", c."createdAt" DESC`
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  },

  // Kirim data sensing Humidity
  getHumidity(req, res) {
    Sensing.findAll({
      include: [
        {
          model: Lokasi,
        },
        {
          model: NodeSensor,
        },
      ],
      attributes: ["id", "humidity", "createdAt"],
    }).then((data) => {
      res.status(200).json(data);
    });
  },

  // realtime data ph air
  getSensingHumidity(req, res) {
    sequelize
      .query(
        `select DISTINCT ON ("namaNode") 
          c.id, 
          "namaNode", 
          "namaLokasi",
          "humidity",
          c."createdAt"
        from "Sensings" as c 
        inner join "NodeSensors" as n on c."idNode" = n.id 
        inner join "Lokasis" as l on c."idLokasi" = n.id
        order by "namaNode", c."createdAt" DESC`
      )
      .then((data) => {
        res.status(200).json(data[0]);
      });
  },
};
