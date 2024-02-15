"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("establishments", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          docName: {
            type: Sequelize.STRING,
          },
          userName: {
            type: Sequelize.STRING,
          },
          status: {
            type: Sequelize.BOOLEAN,
          },
          designation: {
            type: Sequelize.BOOLEAN,
          },
          companyId: {
            type: Sequelize.STRING,
          },
          docDepartmentId: {
            type: Sequelize.STRING,
          },
          docDepartmentName: {
            type: Sequelize.STRING,
          },
          masterDocumentCode: {
            type: Sequelize.STRING,
          },
          masterDocumentName: {
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
    await queryInterface.dropTable("establishments");
  },
};