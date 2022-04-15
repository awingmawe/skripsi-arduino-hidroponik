"use strict";

const inquirer = require("inquirer");
const { connect, disconnect, addSensing } = require("./server");

const mainMenu = () => {
  console.log("============================");
  console.log("Main Menu :");
  console.log("1. Melakukan sensing");
  console.log("2. Melihat status node");
  console.log("3. Manajemen node sensor");
  console.log("4. Berhenti melakukan sensing");
  console.log("============================\n\n");
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
          if (connecting) console.log("Sudah terkonek di port : 8000");
          else {
            connecting = true;
            console.log("Sensing berhasil dinyalakan");
            connect();
          }
          setTimeout(() => {
            mainMenu();
            return pilihanMenu();
          }, 2000);
        } else if (answer.pilihan == "2") {
          console.log("List status node sensor");
          addSensing();
          setTimeout(() => {
            mainMenu();
            return pilihanMenu();
          }, 2000);
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
