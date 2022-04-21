const express = require("express");
const flash = require("express-flash");
const { Sequelize } = require("sequelize");
const config = require("./config/config.json");
const app = express();

const dataXbee = "NODE1|10.00|10.00|11.25|LokasiB";

const portServer = 8000;

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
  convertData(data) {
    const dataSensing = data.split("|");
    console.log(dataSensing);
  },
  disconnect() {
    process.exit();
  },
};
