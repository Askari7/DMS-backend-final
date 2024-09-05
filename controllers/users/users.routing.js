const {
  createUser,
  listUsers,
  checkDuplicateUsernameOrEmail,
  updateUser,
  company,
  notifications,
  getUser,
  profile,
  deleting,
  uploadImage,
  userToUpdate,
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
    delete: {
      action: [validateToken, deleting],
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
  "/notifications": {
    post: {
      action: [validateToken, notifications],
      level: "public",
    },
  },
  "/user_update": {
    post: {
      action: [validateToken, userToUpdate],
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
