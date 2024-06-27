"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MasterDocumentRegister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MasterDocumentRegister.belongsTo(models.projects, {
        foreignKey: 'projectId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });

      MasterDocumentRegister.hasMany(models.documents, {
        foreignKey: 'masterDocumentId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
      MasterDocumentRegister.hasMany(models.establishments, {
        foreignKey: 'companyId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });

    }
  }
  MasterDocumentRegister.init(
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
      mdrCode: {
        type: DataTypes.STRING,
      },
      companyId: {
        type: DataTypes.INTEGER,
      },
      projectId: {
        type: DataTypes.INTEGER,
      },
      authorId: {
        type: DataTypes.INTEGER,
      },
      noOfDocuments: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {

      sequelize,
      modelName: "master_document_registers",


    }
  );
  return MasterDocumentRegister;
};
