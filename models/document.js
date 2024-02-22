"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Document.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      version: {
        type: DataTypes.STRING,
      },
      companyId: {
        type: DataTypes.INTEGER,
      },
      departmentId: {
        type: DataTypes.STRING,
      },
      projectId: {
        type: DataTypes.STRING,
      },
      masterDocumentId: {
        type: DataTypes.STRING,
      },
      masterDocumentName: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      extension: {
        type: DataTypes.STRING,
      },
      fileName: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        //   values:['pending,']
      },
      version: {
        type: DataTypes.STRING,
        //   values:['pending,']
      },
      assignedTo: {
        type: DataTypes.STRING,
        //   values:['pending,']
      },
      assignedFrom: {
        type: DataTypes.STRING,
        //   values:['pending,']
      },
      assignedBy: {
        type: DataTypes.STRING,
        //   values:['pending,']
      },
    },
    {
      sequelize,
      modelName: "documents",
    }
  );
  return Document;
};
