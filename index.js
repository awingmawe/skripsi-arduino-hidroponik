"use strict";

const inquirer = require("inquirer");
const { connect, disconnect, insertData } = require("./server");
const { node } = require("./controller");

const dataXbee = [];

var SerialPort = require("serialport").SerialPort;
var xbee_api = require("xbee-api");
var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1,
});

var serialport = new SerialPort({
  path: "COM4",
  baudRate: 9600,
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

serialport.on("open", function () {
  var frame_obj = {
    // AT Request to be sent
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "NI",
    commandParameter: [],
  };

  xbeeAPI.builder.write(frame_obj);
});

// All frames parsed by the XBee will be emitted here

const mainMenu = () => {
  console.log("============================");
  console.log("Main Menu :");
  console.log("1. Melakukan sensing");
  console.log("2. Manajemen node sensor");
  console.log("3. Berhenti melakukan sensing");
  console.log("4. Keluar aplikasi");
  console.log("============================\n\n");
};

const manageSensor = () => {
  console.log("=============");
  console.log("1. Tambah node sensor");
  console.log("2. Edit node sensor");
  console.log("3. Hapus node sensor");
  console.log("4. Kembali");
  console.log("=============\n\n");
};

mainMenu();

var connecting = false;
var sensing = true;
const pilihanMenu = () => {
  inquirer
    .prompt([
      {
        name: "pilihan",
        type: "input",
        message: "Masukan pilihan",
      },
    ])
    .then((answer) => {
      try {
        if (answer.pilihan == "1") {
          if (connecting) console.log("Sudah terhubung di port : 8000");
          else if (sensing) {
            connecting = true;
            console.log("Sensing berhasil dinyalakan");
            connect();
            xbeeAPI.parser.on("data", function (frame) {
              const data = decodeURIComponent(escape(frame.data));
              if (data == "undefined" || data.length == 0) {
                console.log("Data tidak masuk");
              } else {
                insertData(data, connecting);
              }
            });
          }
          setTimeout(() => {
            mainMenu();
            return pilihanMenu();
          }, 2000);
        } else if (answer.pilihan == "2") {
          manageSensor();
          inquirer
            .prompt([
              {
                name: "manage",
                type: "input",
                message: "Masukan pilihan",
              },
            ])
            .then((answer) => {
              if (answer.manage == 1) {
                mainMenu();
                return pilihanMenu();
              } else {
                setTimeout(() => {
                  mainMenu();
                  return pilihanMenu();
                }, 2000);
              }
            });
        } else if (answer.pilihan == "3") {
          sensing = false;
          setTimeout(() => {
            mainMenu();
            return pilihanMenu();
          }, 2000);
        } else {
          console.log("Keluar aplikasi");
          setTimeout(() => {
            disconnect();
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

pilihanMenu();
