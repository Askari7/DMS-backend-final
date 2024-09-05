const db = require("../../models/index");
const UserModel = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../config/auth.config");
const departments = require("../../models/departments");
const { where } = require("sequelize");
const SystemLogModel = db.system_logs;
const CompanyModel = db.company;

//middlewares

module.exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  console.log("YAHA AYA");
  console.log(req.body,'BODY');
if(req.body.name){
  CompanyModel.findOne({
    where: {
      name: req.body.name,
      // companyId:req.body.companyId
    },
  }).then((company) => {
    if (company) {
      res.status(409).send({
        message: "Failed! Company Already Exists!",
      });
      return;
    }
    next();
  });
}
else{
  console.log("come here");
  
  UserModel.findOne({
    where: {
      email: req.body.email,
      // companyId:req.body.companyId
    },
  }).then((user) => {
    if (user) {
      res.status(409).send({
        message: "Failed! Email Already Exists!",
      });
      return;
    }
    next();
  });
}

 
};

//Signup Login

module.exports.signup = async (req, res) => {

  console.log("Phr yaha");
  
  try {    
    const { body } = req;
    body.owner = body.firstName
    const createdCompany = await CompanyModel.create(body);
    
    // Get the companyId from the createdCompany
    const companyId = createdCompany.id;
    body.password = bcrypt.hashSync(req.body.password, 8);
    body.roleId = 1;
    body.companyId=companyId;
    await UserModel.create(body);
    const user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    console.log("YAHA AYA ma");

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 1.577e8, // 24 hours
    });
    console.log("YAHA AYA");
    
    await SystemLogModel.create({
      companyId: body.companyId,
      typeOfLog:1,
      departmentId:user?.departmentId,
      userId:user?.id,
      title: `${body?.firstName} ${body?.lastName} Signed Up`,
    });
    res.status(200).send({
      user,
      accessToken: token,
    });
  } catch(error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

module.exports.signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 1.577e8, // 24 hours
    });

    await SystemLogModel.create({
      companyId: user?.companyId,
      typeOfLog:2,
      userId:user?.id,
      departmentId:user?.departmentId,
      title: `${user?.firstName} ${user?.lastName} Signed In`,
    });

    res.status(200).send({
      user,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.currentPassword,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    await UserModel.update(
      {
        password: bcrypt.hashSync(req.body.newPassword, 8),
      },
      {
        where: { id: user?.id },
      }
    );
    return res.status(200).send({ message: "Password Updated" });
  } catch {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.changeProfile = async(req,res)=>{
  try {
    console.log(req);
  } catch (error) {
    console.error(error)
  }
}