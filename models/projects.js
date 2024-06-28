"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Projects.belongsTo(models.company, {
        foreignKey: 'companyId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
      Projects.hasOne(models.master_document_registers, {
        foreignKey: 'projectId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
      Projects.hasMany(models.documents, {
        foreignKey: 'projectId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });

      
      Projects.hasMany(models.establishments, {
        foreignKey: 'projectId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });

    }
  }
  Projects.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departmentIds: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
      },
      startedDate: {
        type: DataTypes.DATE,
      },
      endedDate: {
        type: DataTypes.DATE,
      },
      noOfUsers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {

      sequelize,

      modelName: "projects",

    }
  );
  return Projects;
};
