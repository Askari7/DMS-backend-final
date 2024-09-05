const db = require("./models/index");

const path = require("path");
const lumie = require("lumie");
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const multer  = require('multer')
const CompanyModel = db.company
const UserModel = db.users

const app = express();
require("./helpers/send-email-document-deadline")
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// parse application/json
app.use(express.static("uploadedLogos"))

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
lumie.load(app, {
  preURL: "api",
  verbose: true,
  ignore: ["*.spec", "*.action"],
  controllers_path: path.join(__dirname, "controllers"),
});


// Serve static files (your React frontend)
app.use(express.static(path.join(__dirname, "client/build")));

 app.use('/documents', express.static(path.join(__dirname, 'documents')));

 app.use("/uploads", express.static(path.join(__dirname, "uploads")));

 app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));});

const server = app.listen(8083, "127.0.0.1", () => {
  const { address, port } = server.address();
  console.log("DMS app listening at http://%s:%s", address, port);
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploadedLogos/')
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })


app.post('/getLogo',async(req, res)=>{
  console.log("heat");
  try {
    const uploadLogo = await CompanyModel.findOne(
      { where: { id: req.body.companyId } }
    );
    console.log(uploadLogo);
    res.json({"msg":uploadLogo})
  } catch (error) {
    console.error(error)
    res.json({"msg":"Failed"})

  }
})

app.post('/getProfile',async(req, res)=>{
  console.log("heat");
  try {
    const uploadLogo = await UserModel.findOne(
      { where: { id: req.body.userId,companyId:req.body.companyId } }
    );
    console.log(uploadLogo,"uploadLogo");
    res.json({"msg":uploadLogo})
  } catch (error) {
    console.error(error)
    res.json({"msg":"Failed"})

  }
})

app.put('/logo', upload.single('image'), async(req, res)=>{
  console.log(req.file.filename);
  const logo = req.file.filename
  try {
    const uploadLogo = await CompanyModel.update(
      { logo: logo },
      { where: { id: req.body.companyId } }
    );

    res.json({"msg":"Updated"})
  } catch (error) {
    console.error(error)
    res.json({"msg":"Failed"})

  }
})

app.put('/profile', upload.single('image'), async(req, res)=>{
  console.log(req.file.filename);
  const logo = req.file.filename
  try {
    const uploadLogo = await UserModel.update(
      { image: logo },
      { where: { companyId: req.body.companyId ,id:req.body.userId} }
    );

    res.json({"msg":"Updated"})
  } catch (error) {
    console.error(error)
    res.json({"msg":"Failed"})

  }
})


// app.put('/user', upload.single('image'), async(req, res)=>{
//   console.log(req.file.filename);
//   const logo = req.file.filename
//   try {
//     const uploadLogo = await CompanyModel.update(
//       { logo: logo },
//       { where: { id: req.body.companyId } }
//     );

//     res.json({"msg":"Updated"})
//   } catch (error) {
//     console.error(error)
//     res.json({"msg":"Failed"})

//   }
// })
