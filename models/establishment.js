"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  class Establishments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Establishments.init(
    {
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
     
     
    },
    {
      sequelize,
      modelName: "establishments",
    }
  );
  return Establishments;
};
