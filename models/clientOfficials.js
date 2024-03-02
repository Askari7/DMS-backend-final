"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientOfficials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClientOfficials.belongsTo(models.clients, {
        foreignKey: 'companyId',
        targetKey:'id',
        onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
      });
    }
    
  }
  ClientOfficials.init(
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
        clientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      sequelize,
      modelName: "clientOfficials",
    }
  );
  return ClientOfficials;
};
