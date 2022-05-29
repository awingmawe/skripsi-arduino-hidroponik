"use strict";

const inquirer = require("inquirer");
const { connect, disconnect, insertData } = require("./server");
const { node } = require("./controller");

const dataXbee = [
  "NODE1|10.00|10.00|11.25|LokasiB",
  "NODE2|10.00|10.00|11.25|LokasiA",
];

const mainMenu = () => {
  console.log("============================");
  console.log("Main Menu :");
  console.log("1. Melakukan sensing");
  console.log("2. Melihat status node");
  console.log("3. Manajemen node sensor");
  console.log("4. Berhenti melakukan sensing");
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
          else {
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
          console.log("List status node sensor");
          setTimeout(() => {
            mainMenu();
            return pilihanMenu();
          }, 2000);
        } else if (answer.pilihan == "3") {
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
                node.insertNode("Rafi");
                console.log("Berhasil tambah node Rafi");
                mainMenu();
                return pilihanMenu();
              } else {
                setTimeout(() => {
                  mainMenu();
                  return pilihanMenu();
                }, 2000);
              }
            });
        } else {
          console.log("Berhenti sensing");
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
