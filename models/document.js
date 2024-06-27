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
      // define association 
      Document.belongsTo(models.company, {
        foreignKey: 'companyId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });

      Document.belongsTo(models.projects, {
        foreignKey: 'projectId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });

      Document.belongsTo(models.master_document_registers, {
        foreignKey: 'masterDocumentId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
      Document.hasOne(models.establishments, {
        foreignKey: 'documentId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
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
      docTitle: {
        type: DataTypes.STRING,
      },
      version: {
        type: DataTypes.STRING,
      },
      companyId: {
        type: DataTypes.STRING,
      },
      projectId: {
        type: DataTypes.STRING,
      },
      masterDocumentId: {
        type: DataTypes.STRING,
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
      startedDate: {
        type: DataTypes.DATE,
        allowNull:true,
      },
      expectedEndedDate: {
        type: DataTypes.DATE,
        allowNull:true
      },
    },
    {


      sequelize,
      modelName: "documents",

    }
  );
  return Document;
};
