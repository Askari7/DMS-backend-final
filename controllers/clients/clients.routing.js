const { validateToken, authorize } = require("../../helpers/authorize");
const { listClients, createClient,fetchOfficials ,fetchCompany,UpdateCompany} = require("./clients.action");
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
    "/company": {

      get:{
         action: [validateToken, fetchCompany],
         level: "public",
      },
      put:{
        action: [validateToken, UpdateCompany],
        level: "public",
     }
    },
  };
  