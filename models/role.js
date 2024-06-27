// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Roles extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Roles.belongsTo(models.company, {
//         foreignKey: 'companyId',
//         targetKey:'id',
//         onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
//       });
//     }
//   }
//   Roles.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       companyId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: "roles",
//     }
//   );
//   return Roles;
// };




"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.belongsTo(models.company, {
        foreignKey: 'companyId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      Roles.hasMany(models.users, {
        foreignKey: 'roleId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }

  Roles.init(
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
    },
    {
      sequelize,
      modelName: "roles",
    }
  );

  return Roles;
};
