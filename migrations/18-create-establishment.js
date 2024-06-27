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
          version: {
            type: Sequelize.STRING,
          },
          approverId: {
            type: Sequelize.STRING,
          },
          reviewerId: {
            type: Sequelize.STRING,
          },
          approverStatus: {
            type: Sequelize.STRING,
          },
          reviewerStatus: {
            type: Sequelize.STRING,
          },
          approverComment: {
            type: Sequelize.STRING,
          },
          reviewerComment: {
            type: Sequelize.STRING,
          },

          
          clientId: {
            type: Sequelize.STRING,
          },
          clientStatus: {
            type: Sequelize.STRING,
          },
          clientComment: {
            type: Sequelize.STRING,
          },
          status: {
            type: Sequelize.BOOLEAN,
          },
          documentId: {
            type: Sequelize.STRING,
          },
          projectId: {
            type: Sequelize.STRING,
          },
          mdrId: {
            type: Sequelize.STRING,
          },
          companyId: {
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