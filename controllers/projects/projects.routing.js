const { createProject,listInformation,DocumentTreeData ,FetchDepartmentProjectAndMDR,list,progress,FetchClientsDepartmentsAndProjects,createMDRThrough} = require("./projects.action");
const { validateToken, authorize } = require("../../helpers/authorize");
const { get } = require("lodash");
module.exports = {
  "/": {
    get: {
      action: [validateToken, FetchClientsDepartmentsAndProjects],
      level: "public",
    },
    post: {
      action: [validateToken, createProject],
      level: "public",
    },
  },
  "information": {
    get: {
      action: [validateToken,listInformation],
      level: "public",
    },
  },
  "info": {
    get: {
      action: [validateToken, list],
      level: "public",
    },
  },
  "mdr":{
    post: {
      action: [validateToken, createMDRThrough],
      level: "public",
    },
    get: {
      action: [FetchDepartmentProjectAndMDR],
      level: "public",
    },
  }
};
