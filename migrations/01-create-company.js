"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("company", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      details: {
        type: Sequelize.TEXT,
      },
      owner: {
        type: Sequelize.STRING,
      },
      ownerEmail: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
      },
      companyEmail: {
        type: Sequelize.STRING,
      },
      socialLinks: {
        type: Sequelize.STRING,
      },
      industry: {
        type: Sequelize.STRING,
      },
      documentNumberFormat: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("company");
  },
};
