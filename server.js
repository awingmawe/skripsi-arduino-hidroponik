const express = require("express");
const flash = require("express-flash");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const { insertLokasi } = require("./controller/controllerLokasi");
const { insertNode } = require("./controller/controllerNode");
const { insertSensing, getSensing } = require("./controller/controllerSensing");
const { NodeSensor, Lokasi, sequelize } = require("./models");
const { routerSensing, routerNode } = require("./router");
const cors = require("cors");
const app = express();

const portServer = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// Connect to database
const db = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: 5432,
    logging: false,
  }
);

// Endpoint untuk digunakan di website
app.use("/sensing", routerSensing);
app.use("/node", routerNode);

module.exports = {
  connect() {
    app.listen(portServer, () => {
      console.log(`Koneksi terhubung ke port : ${portServer}`);
      db.authenticate()
        .then(
          console.log(
            `Berhasil konek ke database ${config.development.database}`
          )
        )
        .catch((err) => {
          console.error("Gagal konek ke database", err);
        });
    });
  },
  insertData(data, status) {
    const dataSensing = data.split("|");
    console.log(data);
    const dataConvert = dataSensing;
    const nodeName = dataConvert[0];
    const lokasiName = dataConvert[1];
    NodeSensor.findOne({
      where: {
        namaNode: nodeName,
      },
    })
      .then(async (ret) => {
        if (!ret && ret == null) {
          insertNode(nodeName);
        }
        const lokasi = await Lokasi.findOne({
          where: {
            namaLokasi: lokasiName,
          },
        }).catch((err) => {
          console.log(err);
        });
        if (!lokasi && lokasi == null) {
          insertLokasi(lokasiName);
        }
        setTimeout(() => {
          const idNodes = ret.id;
          const idLocation = lokasi.id;
          const dataSensing = {
            idNode: idNodes,
            idLokasi: idLocation,
            phAir: dataConvert[4],
            humidity: dataConvert[5],
            suhuAir: dataConvert[3],
            kelarutan: dataConvert[6],
            suhuUdara: dataConvert[2],
          };
          insertSensing(dataSensing);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  disconnect() {
    process.exit();
  },
};
