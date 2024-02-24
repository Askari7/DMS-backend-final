const path = require("path");
const lumie = require("lumie");
const express = require("express");
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
 app.use('/documents', express.static(path.join(__dirname, 'documents')));

 app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = app.listen(8083, "0.0.0.0", () => {
  const { address, port } = server.address();
  console.log("Example app listening at http://%s:%s", address, port);
});
