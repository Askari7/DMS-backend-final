const { createProject, listProjects,listInformation ,list,progress, projectUpdate} = require("./projects.action");
const { validateToken, authorize } = require("../../helpers/authorize");
module.exports = {
  "/": {
    get: {
      action: [validateToken, listProjects],
      level: "public",
    },
    post: {
      action: [validateToken, createProject],
      level: "public",
    },
    put: {
      action: [validateToken, projectUpdate],
      level: "public",
    },
  },
  "information": {
    get: {
      action: [validateToken, listInformation],
      level: "public",
    },
  },
  "info": {
    get: {
      action: [validateToken, list],
      level: "public",
    },
  },
  "progress": {
    get: {
      action: [validateToken, progress],
      level: "public",
    },
  },
};
