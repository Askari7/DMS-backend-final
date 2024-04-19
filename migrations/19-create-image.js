

  "use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("image", {
        type: {
            type: Sequelize.STRING,
          },
          name: {
            type: Sequelize.STRING,
          },
          data: {
            type: Sequelize.BLOB("long"),
          },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("image");
  },
};