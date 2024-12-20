"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      departmentIds: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentSuffix: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      clientId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      removed: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      startedDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      endedDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      noOfUsers: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("projects");
  },
};
