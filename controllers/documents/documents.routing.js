const {
  createMDR,
  createDocument,
  listDocuments,
  listMDR,
  createPermission,
  listPermission,
  resolved,  updateDocumentFormat,
  addingDoc,
  exportMDRCsv,
  gettingEstablishment,
  getCodes,createComment, listComments, uploadDoc, uploadComment, getDocumentFormat,assignDoc,updateMDR, listEstablishment, updateDocStatus, exportDoc,
  updateReview,
  Accept,
  exportComments,
  MDRUpdate,
  checkDoc
} = require("./documents.action");
const { validateToken, authorize } = require("../../helpers/authorize");

const multer = require("multer");
const path = require("path");
const { uid } = require("uid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = file.originalname;
    req.body.fileName = filename;
    cb(null, filename); // File name (timestamp + original extension)
  },
});
const uploadFile = multer({ storage: storage });

module.exports = {
  "/": {
    get: {
      action: [validateToken, listDocuments],
      level: "public",
    },
    put: {
      action: [validateToken, assignDoc],
      level: "public",
    },
    post: {
      middlewares: [uploadFile.single("file")],
      action: [validateToken, createDocument],
      level: "public",
    },
  },
  "/upload": {
    // get: {
    //   action: [validateToken, listDocuments],
    //   level: "public",
    // },
    post: {
      middlewares: [uploadFile.single("file")],
      action: [validateToken, uploadDoc],
      level: "public",
    },
  },
  "/checkDocuments": {
    get: {
      action: [validateToken, checkDoc],
      level: "public",
    },
  },
  "/mdr": {
    get: {
      action: [validateToken, listMDR],
      level: "public",
    },

    post: {
      action: [validateToken, createMDR],
      level: "public",
    },
    put: {
      action: [validateToken, updateMDR],
      level: "public",
    },
    
  },
  "/addingDoc": {
    post: {
      action: [validateToken, addingDoc],
      level: "public",
    },
  },
  "/establishment": {
    get: {
      action: [validateToken, listEstablishment],
      level: "public",
    },

    put: {
      action: [validateToken, updateDocStatus],
      level: "public",
    },
    post: {
      action: [validateToken, gettingEstablishment],
      level: "public",
    },
  },

  "/mdr_update": {
    put: {
      action: [validateToken, MDRUpdate],
      level: "public",
    },
  },
  "/review": {
    put: {
      action: [validateToken,updateReview ],
      level: "public",
    },
    post: {
      action: [validateToken,Accept ],
      level: "public",
    },
  },
  "/exportComments": {
    get: {
      action: [ exportComments],
      level: "public",
    },
  },
  "/comments": {
    get: {
      action: [ listComments],
      level: "public",
    },

    post: {
      action: [ createComment],
      level: "public",
    },
    put: {
      action: [ uploadComment],
      level: "public",
    },
  },
  "/permissions": {
    get: {
      action: [validateToken, listPermission],
      level: "public",
    },
    post: {
      action: [validateToken, createPermission],
      level: "public",
    },
  },
  "/resolved": {
    post: {
      action: [resolved],
      level: "public",
    },
  },
  "/format": {
    post: {
      action: [validateToken, updateDocumentFormat],
      level: "public",
    },
    get: {
      action: [validateToken, getDocumentFormat],
      level: "public",
    },
  },
  "/export/:id": {
    post: {
      action: [exportMDRCsv],
      level: "public",
    },
  },
  "/exportDoc": {
    post: {
      action: [exportDoc],
      level: "public",
    },
  },
  "/getCodes":{
    get:{
      action:[getCodes],
      level:"public",
    }
  },
};
