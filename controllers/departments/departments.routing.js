const { notifications,listDepartments,departmentUpdate, createDepartment,associateUserDepartment ,updateUser,listCounts} = require("./departments.action");
const { validateToken, authorize } = require("../../helpers/authorize");

module.exports = {
  "/": {
    get: {
      action: [validateToken, listDepartments],
      level: "public",
    },
    post: {
      action: [validateToken, createDepartment],
      level: "public",
    },
    put: {
      action: [validateToken, updateUser],
      level: "public",
    },
  },
  "/count": {
    get: {
      action: [validateToken, listCounts],
      level: "public",
    }
  },
  
  "/associate": {
   
    post: {
      action: [validateToken, associateUserDepartment],
      level: "public",
    },
  },
  "/notifications": {
    post: {
      action: [validateToken, notifications],
      level: "public",
    },
  },
  "/department_update": {
    put: {
      action: [validateToken, departmentUpdate],
      level: "public",
    },
  },
};
