"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sensings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idNode: {
        type: Sequelize.INTEGER,
      },
      idLokasi: {
        type: Sequelize.INTEGER,
      },
      kelarutan: {
        type: Sequelize.FLOAT,
      },
      phAir: {
        type: Sequelize.FLOAT,
      },
      suhuAir: {
        type: Sequelize.FLOAT,
      },
      suhuUdara: {
        type: Sequelize.FLOAT,
      },
      humidity: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
      },
    });
    await queryInterface.addConstraint("Sensings", {
      fields: ["idNode"],
      type: "foreign key",
      references: {
        table: "NodeSensors",
        field: "id",
      },
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("Sensings", {
      fields: ["idLokasi"],
      type: "foreign key",
      references: {
        table: "Lokasis",
        field: "id",
      },
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sensings");
  },
};
