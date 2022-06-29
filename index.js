"use strict";

const inquirer = require("inquirer");
const { connect, disconnect, insertData } = require("./server");

var SerialPort = require("serialport").SerialPort;
var xbee_api = require("xbee-api");
var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1,
});

var serialport = new SerialPort({
  path: "/dev/ttyUSB0",
  // path: "COM4",
  baudRate: 9600,
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

// All frames parsed by the XBee will be emitted here
serialport.on("open", function () {
  var saluranAir = {
    // AT Request to be sent
    type: C.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST,
    destination64: "0013a20041dd3e53", // node saluran air
    data: "mulai",
  };
  var penampunganAir = {
    type: C.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST,
    destination64: "0013a20041dd3d88", // node penampungan air
    data: "mulai",
  };
  xbeeAPI.builder.write(saluranAir);
  xbeeAPI.builder.write(penampunganAir);
});

// serialport.on("open", () => {
//   var penampunganAir = {
//     type: C.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST,
//     destination64: "0013a20041dd3d88", // node penampungan air
//     data: perintah,
//   };
// });

const mainMenu = () => {
  console.log("============================");
  console.log("Main Menu :");
  console.log("1. Mulai sensing");
  console.log("2. Berhenti melakukan sensing");
  console.log("3. Keluar aplikasi");
  console.log("============================\n\n");
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
          sensing = true;
          if (connecting) console.log("Sudah terhubung di port : 8000");
          else connect();
          if (sensing) {
            connecting = true;
            console.log("Sensing berhasil dinyalakan");

            xbeeAPI.parser.on("data", function (frame) {
              // console.log(frame);
              const data = decodeURIComponent(escape(frame.data));
              if (data == "undefined" || data.length == 0) {
                console.log("Data tidak masuk");
              } else {
                // console.log(data);
                insertData(data, sensing);
              }
            });
          }
          setTimeout(() => {
            mainMenu();
            return pilihanMenu();
          }, 2000);
        } else if (answer.pilihan == "2") {
          sensing = false;
          console.log("Sensing Berhenti");
          serialport.on("open", function () {
            xbeeAPI.builder.write(saluranAir("berhenti"));
            xbeeAPI.builder.write(penampunganAir("berhenti"));
          });
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
