const {
  createUser,
  listUsers,
  checkDuplicateUsernameOrEmail,
  updateUser,
  company,
  getUser,
  profile,
  uploadImage,
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
  "/company": {
    get: {
      action: [validateToken, company],
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
