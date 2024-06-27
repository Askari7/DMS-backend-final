// const {
//   createUser,
//   listUsers,
//   checkDuplicateUsernameOrEmail,
//   updateUser,
//   company,
//   getUser,
//   profile,
//   oneToManyClient,
//   oneToMany,
//   uploadImage,
//   oneToManyDepartment,
//   oneToManyProjectMDR,
//   oneToManyProjectORMDRtoDocs,
// } = require("./users.action");
// const { validateToken, authorize } = require("../../helpers/authorize");
// module.exports = {
//   "/": {
//     get: {
//       action: [validateToken, listUsers],
//       level: "public",
//     },
//     post: {
//       middlewares: checkDuplicateUsernameOrEmail,
//       action: [validateToken, createUser],
//       level: "public",
//     },
//     put: {
//       action: [validateToken, updateUser],
//       level: "public",
//     },
//   },
//   "/company": {
//     get: {
//       action: [validateToken, company],
//       level: "public",
//     },
//     put: {
//       action: [ oneToMany],
//       level: "public",
//     },

//     post: {
//       action: [ oneToManyClient],
//       level: "public",
//     },


//   },

//   "/department": {
//     get: {
//       action: [oneToManyDepartment],
//       level: "public",
//     },
//     post: {
//       action: [oneToManyProjectMDR],
//       level: "public",
//     },
//     put: {
//       action: [oneToManyProjectORMDRtoDocs],
//       level: "public",
//     },

//   },
//   "/:id": {
//     get: {
//       action: [validateToken, getUser],
//       level: "public",
//     },
//     put: {
//       action: [validateToken, updateUser],
//       level: "public",
//     },
//   },
//   "/upload": {
//     get: {
//       action: [validateToken, profile],
//       level: "public",
//     },
//     put: {
//       action: [validateToken, uploadImage],
//       level: "public",
//     },
//   }
// };


const {
  createUser,
  listUsers,
  checkDuplicateUsernameOrEmail,
  fetchingDataOfUsersAndDepartments,
  updateUser,
  company,
  getUser,
  profile,
  oneToManyClient,
  oneToMany,
  uploadImage,
  oneToManyDepartment,
  oneToManyProjectMDR,
  oneToManyProjectORMDRtoDocs,
} = require("./users.action");
const { validateToken, authorize } = require("../../helpers/authorize");
module.exports = {
  "/": {
    get: {
      action: [validateToken, listUsers],
      level: "public",
    },
    post: {
      middlewares: checkDuplicateUsernameOrEmail,
      action: [validateToken, createUser],
      level: "public",
    },
    put: {
      action: [validateToken, updateUser],
      level: "public",
    },
  },

  "/data": {
    get: {
      action: [fetchingDataOfUsersAndDepartments],
      level: "public",
    },
  },

  "/company": {
    get: {
      action: [validateToken, company],
      level: "public",
    },
    put: {
      action: [ oneToMany],
      level: "public",
    },

    post: {
      action: [ oneToManyClient],
      level: "public",
    },


  },

  "/department": {
    get: {
      action: [oneToManyDepartment],
      level: "public",
    },
    post: {
      action: [oneToManyProjectMDR],
      level: "public",
    },
    put: {
      action: [oneToManyProjectORMDRtoDocs],
      level: "public",
    },
  },
  "/:id": {
    get: {
      action: [validateToken, getUser],
      level: "public",
    },
    put: {
      action: [validateToken, updateUser],
      level: "public",
    },
  },
  "/upload": {
    get: {
      action: [validateToken, profile],
      level: "public",
    },
    put: {
      action: [validateToken, uploadImage],
      level: "public",
    },
  }
};
