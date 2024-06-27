"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Departments.hasMany(models.users, {
        foreignKey: 'departmentId',
        sourceKey:'id',
        onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
      });

      Departments.belongsTo(models.company, {
        foreignKey: 'companyId',
        sourceKey:'id',
        onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
      });
      
    }
  }
  Departments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      suffix: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noOfUsers: {
        type: DataTypes.INTEGER,
      },
    },
    {


      sequelize,
      modelName: "departments",

    }
  );
  return Departments;
};
