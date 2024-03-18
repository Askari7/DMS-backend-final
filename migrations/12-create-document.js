"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      docTitle: {
        type: Sequelize.STRING,
      },
      companyId: {
        type: Sequelize.INTEGER,
      },
      departmentId: {
        type: Sequelize.STRING,
      },
      projectId: {
        type: Sequelize.STRING,
      },
      masterDocumentId: {
        type: Sequelize.STRING,
      },
      masterDocumentName: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      extension: {
        type: Sequelize.STRING,
      },
      fileName: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      version: {
        type: Sequelize.STRING,
      },
      assignedTo: {
        type: Sequelize.STRING,
      },
      assignedBy: {
        type: Sequelize.STRING,
      },
      assignedFrom: {
        type: Sequelize.STRING,
      },
      startedDate: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'), // Set the default value to the current timestamp
      },
      expectedEndedDate: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null, // Set the default value to null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("documents");
  },
};
