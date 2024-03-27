const path = require("path");
const lumie = require("lumie");
const express = require("express");
const multer  = require('multer')
var bodyParser = require("body-parser");

const cors = require("cors");

// app
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// parse application/json

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
lumie.load(app, {
  preURL: "api",
  verbose: true,
  ignore: ["*.spec", "*.action"],
  controllers_path: path.join(__dirname, "controllers"),
});

const upload = multer({ dest: 'uploads/' })

// Serve static files (your React frontend)
app.use(express.static(path.join(__dirname, "client/build")));

 app.use('/documents', express.static(path.join(__dirname, 'documents')));

 app.use("/uploads", express.static(path.join(__dirname, "uploads")));

 app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));});
const server = app.listen(8083, "0.0.0.0", () => {
  const { address, port } = server.address();
  console.log("DMS app listening at http://%s:%s", address, port);
});


app.post("/upload",upload.single("profileImage"),(req,res)=>{
  console.log(req.body);
})