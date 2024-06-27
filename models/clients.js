"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clients.belongsTo(models.company, {
        foreignKey: 'companyId',
        targetKey:'id',
        onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
      });
      Clients.hasMany(models.clientOfficials, {
        foreignKey: 'companyIdOfClient',
        targetKey:'id',
        onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
      });

    }
  }
  Clients.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyContact: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {


      sequelize,
      modelName: "clients",
    }
  );
  return Clients;
};
