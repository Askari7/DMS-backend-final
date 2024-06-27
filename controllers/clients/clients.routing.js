// const { validateToken, authorize } = require("../../helpers/authorize");
// const { listClients, createClient,fetchOfficials ,fetchCompany,UpdateCompany, sendEmailClient, FetchClientAndOfficials} = require("./clients.action");
//   module.exports = {
//     "/": {
//       get: {
//         action: [ FetchClientAndOfficials],
//         level: "public",
//       },
//       post: {
//         action: [validateToken, createClient],
//         level: "public",
//       },
//     },
//     // "/official": {
//     //   get:{
//     //      action: [validateToken, fetchOfficials],
//     //      level: "public",
//     //   }
//     // },
//     "/send-email-client": {
//       // post: {
//       //   action: [validateToken, createClientOfficial],
//       //   level: "public",
//       // },
//       post: {
//         action: [validateToken, sendEmailClient],
//         level: "public",
//       },
//     },
//     "/company": {
//       get:{
//          action: [validateToken, fetchCompany],
//          level: "public",
//       },
//       put:{
//         action: [validateToken, UpdateCompany],
//         level: "public",
//      }
//     },
//   };
  

const { validateToken, authorize } = require("../../helpers/authorize");
const { createClient, fetchCompany,UpdateCompany, sendEmailClient, FetchClientAndOfficials} = require("./clients.action");
  module.exports = {
    "/": {
      get: {
        action: [ FetchClientAndOfficials],
        level: "public",
      },
      post: {
        action: [validateToken, createClient],
        level: "public",
      },
    },
    "/send-email-client": {

      post: {
        action: [validateToken, sendEmailClient],
        level: "public",
      },
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
  