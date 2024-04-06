const db = require("../../models/index");
const UserModel = db.users;
const DepartmentModel = db.departments;
const SystemLogModel = db.systemLog;

const DepartmentUserAssociation = db.department_user_associations;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const {
  generateRandomPassword,
} = require("../../helpers/generate-user-password");
const { sendEmail } = require("../../helpers/send-email");

module.exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  console.log(req.body.companyId, "req");
  const roleId = req.body.roleId;
  const department = req.body.department;
  const companyId = req.body.companyId
  if (roleId === "2") {
    // If roleId is 2, check if user exists with the provided roleId and department
    const existingUser = await UserModel.findOne({ where: { roleId, department,companyId } });
    if (existingUser) {
      res.send({ message: "Failed! Lead already exists!" });
      return;
    }
  }

  // Check if user exists with the provided email and companyId
  UserModel.findOne({
    where: {
      email: req.body.email,
      companyId: req.body.companyId
    }
  }).then((user) => {
    if (user) {
      res.send({
        message: "Failed! Email already exists!"
      });
      return;
    }
    next();
  });
};


module.exports.createUser = async (req, res) => {
  try {
    const { body } = req;

    const findUser = await UserModel.findOne({ department: body.department, companyId: body.companyId });
    console.log(findUser,'findUser');


    const password = generateRandomPassword(10);
    body.password = bcrypt.hashSync(password, 8);
    const role = req.body.roleId
    const department = req.body.department
    const companyId = req.body.companyId

    console.log(department,'department');
    const findDepartment = await DepartmentModel.findOne({where:{title: department,companyId} });
    console.log(findDepartment,"findDepartment");
// Check if the department exists
if (findDepartment) {
    // Increment the noOfUsers count by one
    findDepartment.noOfUsers += 1;

    // Save the updated department
    await findDepartment.save();
} else {
    // Department not found, handle the case accordingly
    console.log('Department not found');
}
    if(role!=="2"){
    const report = await UserModel.findOne({
      where:{department:department,roleId:2,companyId:req.body.companyId}
    })
    req.body.reported_to = `${report.firstName} ${report.lastName}`
  }
    else{
      const ceo = await UserModel.findOne({
        where:{roleId:1,companyId:req.body.companyId}
      })
      console.log(ceo,"ceo");
      req.body.reported_to = `${ceo.firstName} ${ceo.lastName}`
    }

    console.log(req.body.reported_to,"reporting");
    

    console.log(role,department,"things");
    const users = await UserModel.create(body);
    body.password = password;
    await sendEmail(body);

    return res.status(200).send({ message: "User has been Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { body } = req;

    let updatedFields = {};
    if (body.newPassword) {
      body.newPassword = bcrypt.hashSync(body.newPassword, 8);
      updatedFields.password = body.newPassword;
    } else {
      // If newPassword doesn't exist, update other fields
      updatedFields = { ...body };
      // Remove id field to prevent updating it accidentally
      delete updatedFields.id;
    }

    const [rowsAffected] = await UserModel.update(updatedFields, {
      where: { id: req?.params?.id },
    });

    const token = jwt.sign({ id: req?.params?.id }, config.secret, {
      expiresIn: 1.577e8, // 24 hours
    });

    const user = await UserModel.findOne({
      where: { id: req?.params?.id },
    });

    // Create a system log
    let logTitle = '';
    if (body.newPassword) {
      logTitle = `${user?.firstName} ${user?.lastName}'s password has been updated`;
    } else {
      logTitle = `${user?.firstName} ${user?.lastName}'s record has been updated`;
    }
    // Uncomment to create a system log
    // await SystemLogModel.create({
    //   title: logTitle,
    //   companyId: user?.companyId,
    // });

    res.status(200).send({
      user,
      accessToken: token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: { id: req?.params?.id },
    });

    return res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listUsers = async (req, res) => {
  try {
    const departmentId = req?.query?.departmentId
    const companyId =  req?.query?.companyId
    console.log(departmentId,"ayiiii");
    if (departmentId) {
      // console.log(departmentId,"ayiiiiiiiiiiiiii");
      const users = await UserModel.findAll({
        where: {  companyId,departmentId},
      });
      console.log(users,"users");
      return res.status(200).send(users);  
    } else {
      const users = await UserModel.findAll({
        where: { companyId: req?.query?.companyId },
        raw: true,
      });
     
      const data = [];
      for (const item of users) {
        console.log(item.id);
        let roleTitle = "";
        
        const department = await DepartmentUserAssociation.findOne({
          where: { userId: item.id },
          raw: true,
        });
        console.log(department);
  
        if (item.roleId == 1) roleTitle = "CEO";
        else if (item.roleId == 2) roleTitle = "Head";
        else if (item.roleId == 3) roleTitle = "Senior";
        else if (item.roleId == 4) roleTitle = "Junior";
        else if (item.roleId == 5) roleTitle = "Designer";
  
        else roleTitle == "Client";
        if(department!== null){
        
          console.log('hi');
          const userDepartmentId=department.departmentId;
          var departmentName = await DepartmentModel.findOne({
            where: { id: userDepartmentId },
            raw: true,
          });
          departmentName=departmentName.title;
          data.push({ ...item, roleTitle,departmentName });
        }
        else{
        data.push({ ...item, roleTitle });}
      }
      console.log('mydata',data);
      return res.status(200).send(data);  
    }
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
