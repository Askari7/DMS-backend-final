"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Establishments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
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
        type: DataTypes.INTEGER,
      },
      docName: {
        type: DataTypes.STRING,
      },
      userName: {
        type: DataTypes.STRING,
      },
      reviewer: {
        type: DataTypes.STRING,
      },
      approver: {
        type: DataTypes.STRING,
      },
      approverId: {
        type: DataTypes.STRING,
      },
      reviewerId: {
        type: DataTypes.STRING,
      },

      approverStatus: {
        type: DataTypes.STRING,
      },
      reviewerStatus: {
        type: DataTypes.STRING,
      },
      approverComment: {
        type: DataTypes.STRING,
      },
      reviewerComment: {
        type: DataTypes.STRING,
      },
      clientId: {
        type: DataTypes.STRING,
      },

      clientStatus: {
        type: DataTypes.STRING,
      },
      clientComment: {
        type: DataTypes.STRING,
      },
      version: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      designation: {
        type: DataTypes.BOOLEAN,
      },
      sendToClient: {
        type: DataTypes.BOOLEAN,
      },
      sendForApproval: {
        type: DataTypes.BOOLEAN,
      },
      companyId: {
        type: DataTypes.STRING,
      },
      docDepartmentId: {
        type: DataTypes.STRING,
      },
      docDepartmentName: {
        type: DataTypes.STRING,
      },
      masterDocumentCode: {
        type: DataTypes.STRING,
      },
      masterDocumentName: {
        type: DataTypes.STRING,
      },
      removed: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
     
     
    },
    {
      sequelize,
      modelName: "establishments",
    }
  );
  return Establishments;
};
