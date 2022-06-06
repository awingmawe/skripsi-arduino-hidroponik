"use strict";

const inquirer = require("inquirer");
const { connect, disconnect, insertData } = require("./server");
const { node } = require("./controller");

const dataXbee = [
  "NODE1|10.00|10.00|11.25|20.00|50|LokasiB",
  "NODE2|10.00|10.00|11.25|20.00|50|LokasiA",
];

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
            // setInterval(() => {
            insertData(dataXbee, connecting);
            // }, 2000);
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
