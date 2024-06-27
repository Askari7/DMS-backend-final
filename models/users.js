// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Users extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       Users.belongsTo(models.company, {
//         foreignKey: 'companyId',
//         targetKey:'id',
//         onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
//       });
//       Users.belongsTo(models.role, {
//         foreignKey: 'roleId',
//         targetKey:'id',
//         onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
//       });

//       Users.belongsTo(models.departments, {
//         foreignKey: 'departmentId',
//         targetKey:'id',
//         onDelete: 'CASCADE', // You can adjust onDelete based on your requirements
//       });
//     }
    
//   }
//   Users.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       companyId: {
//         type: DataTypes.INTEGER,
//       },
//       roleId: {
//         type: DataTypes.INTEGER,
//       },
//       departmentId: {
//         type: DataTypes.STRING,
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING,
//       },
//       reported_to: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       image: {
//         type: DataTypes.BLOB('long'),        
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: "users",
//     }
//   );
//   return Users;
// };



"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.company, {
        foreignKey: 'companyId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      Users.belongsTo(models.departments, {
        foreignKey: 'departmentId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      companyId: {
        type: DataTypes.INTEGER,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
      departmentId: {
        type: DataTypes.INTEGER, // Adjusted to INTEGER for consistency
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      reported_to: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
      },
    },
    {
      sequelize,

      modelName: "users",

    }
  );

  return Users;
};
