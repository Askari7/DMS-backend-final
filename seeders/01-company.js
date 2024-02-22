"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "company",
      [
        {
          id: 1,
          name: "PCEC",
          documentNumberFormat: "projectCode-departName-mdrCode-docNumber",
          details:
            "PCEC Petrochemical Engineering Consultancy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("company", null, {});
  },
};
