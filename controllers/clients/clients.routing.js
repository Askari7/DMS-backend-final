const { validateToken, authorize } = require("../../helpers/authorize");
const { listClients, createClient,fetchOfficials } = require("./clients.action");
  module.exports = {
    "/": {
      get: {
        action: [validateToken, listClients],
        level: "public",
      },
      post: {
        action: [validateToken, createClient],
        level: "public",
      },
    },
    "/official": {
      // post: {
      //   action: [validateToken, createClientOfficial],
      //   level: "public",
      // },
      get:{
         action: [validateToken, fetchOfficials],
         level: "public",
      }
    },
  };
  