const express = require("express");
const flash = require("express-flash");
const { Sequelize } = require("sequelize");
const config = require("./config/config.json");
const { insertLokasi } = require("./controller/controllerLokasi");
const { insertNode } = require("./controller/controllerNode");
const { insertSensing } = require("./controller/controllerSensing");
const { NodeSensor, Lokasi } = require("./models");
const { routerSensing } = require("./router");
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
    port: 7000,
    logging: false,
  }
);

app.use("/sensing", routerSensing);

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
    setInterval(() => {
      const dataSensing = data.split("|");
      const dataConvert = dataSensing;
      const nodeName = dataConvert[0];
      const lokasiName = dataConvert[4];
      console.log("Nama Node : " + nodeName + "\nNama Lokasi : " + lokasiName);
      NodeSensor.findOne({
        where: {
          namaNode: nodeName,
        },
      }).then(async (ret) => {
        if (!ret && ret == null) {
          insertNode(nodeName);
        }
        const lokasi = await Lokasi.findOne({
          where: {
            namaLokasi: lokasiName,
          },
        });
        if (!lokasi && lokasi == null) {
          insertLokasi(lokasiName);
        }
        const idNodes = ret.id;
        const idLocation = lokasi.id;
        const dataSensing = {
          idNode: idNodes,
          idLokasi: idLocation,
          phAir: dataConvert[1],
          humidity: dataConvert[2],
          suhuAir: dataConvert[3],
        };
        insertSensing(dataSensing);
      });
    }, 2000);
  },
  disconnect() {
    process.exit();
  },
};
