const db = require("../../models/index");
const UserModel = db.users;
const DepartmentModel = db.departments;
const SystemLogModel = db.system_logs;
const CompanyModel = db.company
const ProjectModel = db.projects
const DocumentModel = db.documents
const EstablishmentModel = db.establishments

const MDRModel = db.master_document_registers;

const DepartmentUserAssociation = db.department_user_associations;
const multer  = require('multer')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");




const {
  generateRandomPassword,
} = require("../../helpers/generate-user-password");
const { sendEmail } = require("../../helpers/send-email");
const { where } = require("sequelize");
const dayjs = require("dayjs");

// module.exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
//   // Username
//   console.log(req.body.companyId, "req");
//   const roleId = req.body.roleId;
//   const department = req.body.department;
//   const companyId = req.body.companyId
//   if (roleId == "2") {
//     // If roleId is 2, check if user exists with the provided roleId and department
//     const [updatedCount, updatedUser] = await UserModel.update(
//       { roleId: "3" }, // New roleId value to update to
//       { 
//         where: { roleId, department, companyId },
//         returning: true, // Make sure to include returning true to get the updated user object
//       }
//     );
        
//     if (updatedUser) {
//       res.send({ message: "Lead has been changed!" });
//     }
//   }

//   UserModel.findOne({
//     where: {
//       email: req.body.email,
//       companyId: req.body.companyId
//     }
//   }).then((user) => {
//     if (user) {
//       res.send({
//         message: "Failed! Email already exists!"
//       });
//       return;
//     }
//     next();
//   });
// };



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


module.exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const { roleId, department, companyId, email } = req.body;
    
    // Check if the roleId is 2 and update the existing user's role to 3
    if (roleId === "2") {
      const [updatedCount, updatedUser] = await UserModel.update(
        { roleId: "3",reported_to:`${req.body.firstName} ${req.body.lastName}`}, 
        { 
          where: { roleId, department, companyId },
          returning: true 
        }
      );

      if (updatedCount > 0) {
        res.send({ message: "Lead has been changed!" });
        return;
      }
    }

    // Check for duplicate email
    const existingUser = await UserModel.findOne({
      where: { email, companyId }
    });

    if (existingUser) {
      return res.status(400).send({ message: "Failed! Email already exists!" });
    }

    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Server Error" });
  }
};


module.exports.notifications = async (req, res) => {
  console.log('hii');
  
  // try {

    console.log("YAHA AI HA request");
    const id = String(req?.body?.companyId);
    const userId = String(req?.body?.userId);

    const logs = await SystemLogModel.findAll({
      where: { companyId: id,userId:userId },
      order: [["createdAt", "DESC"]],

    });
    console.log(logs,'logs hain y');
    
    logs.map(log=>
      log.createdAt = dayjs(log?.createdAt).format("YYYY-MM-DD HH:mm:ss")
    )
    
    console.log(logs,'logs');
    
    res.status(200).send(logs)
  //   } catch (err) {
  //   console.log(err.message);
  //   res.status(500).send({ message: err.message });
  // }
};

// module.exports.createUser = async (req, res) => {

//   try {
//     const { body } = req;
//     console.log(body,"ye dekhle");
//   // const logo = req.file.filename
//     const findUser = await UserModel.findOne({where:{department: body.department, companyId: body.companyId} });
//     // console.log(findUser,'findUser');


//     const password = generateRandomPassword(10);

//     const role = req.body.roleId
//     const department = req.body.department
//     const companyId = req.body.companyId

//     // console.log(department,'department');
//     const companyName = await CompanyModel.findOne({where:{id: companyId} });
//     body['companyName']=companyName.name;
//     const findDepartment = await DepartmentModel.findOne({where:{title: department,companyId} });
//     // console.log(findDepartment,"findDepartment");
// // Check if the department exists
// if (findDepartment) {
//     // Increment the noOfUsers count by one
//     findDepartment.noOfUsers += 1;

//     // Save the updated department
//     await findDepartment.save();
// } else {
//     // Department not found, handle the case accordingly
//     console.log('Department not found');
// }
//     if(role!=="2"){
//     const report = await UserModel.findOne({
//       where:{department:department,roleId:2,companyId:req.body.companyId}
//     })
//     req.body.reported_to = `${report.firstName} ${report.lastName}`
//   }
//     else{
//       const ceo = await UserModel.findOne({
//         where:{roleId:1,companyId:req.body.companyId}
//       })
//       console.log(ceo,"ceo");
//       req.body.reported_to = `${ceo.firstName} ${ceo.lastName}`
//     }

//     console.log(req.body.reported_to,"reporting");
    
//     body.password = bcrypt.hashSync(password, 8);

//     console.log(role,department,"things");
//     const users = await UserModel.create(body);
//     body.password = password;
//     await sendEmail(body);

//     return res.status(200).send({ message: "User has been Created" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


module.exports.createUser = async (req, res) => {
  try {
    
    const { body } = req;
    const { roleId, department, companyId } = body;
    console.log(body,roleId,department,companyId,'companyIdcompanyId');

    // Generate a random password
    const password = generateRandomPassword(10);

    // Fetch company name
    const companyName = await CompanyModel.findOne({ where: { id: companyId } });
    body['companyName'] = companyName.name;

    // Fetch and update department's user count
    const findDepartment = await DepartmentModel.findOne({ where: { title: department, companyId } });

    if (findDepartment) {
      findDepartment.noOfUsers += 1;
      await findDepartment.save();
    } else {
      console.log('Department not found');
    }

    // Determine reporting user based on roleId
    if (roleId !== "2") {
      const report = await UserModel.findOne({
        where: { department, roleId: 2, companyId }
      });

      req.body.reported_to = `${report.firstName} ${report.lastName}`;
    } else {
      const ceo = await UserModel.findOne({
        where: { roleId: 1, companyId }
      });

      req.body.reported_to = `${ceo.firstName} ${ceo.lastName}`;
    }

    // Hash the password and create the user
    body.password = bcrypt.hashSync(password, 8);
    const users = await UserModel.create(body);

    // Send the password via email
    body.password = password;
    await sendEmail(body);

    const user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });
console.log('my user',user);

    await SystemLogModel.create({
      companyId: body.companyId,

      typeOfLog:9,
      userId:user?.id,
      title: `${user.firstName} ${user.lastName} is added into company as employee`,
    });



    return res.status(200).send({ message: "User has been Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};



module.exports.userToUpdate = async (req, res) => {
  try {
    console.log("hello");
    
    const body = req.body
    const {companyId,id} = req.query
    console.log(body,companyId,id);

    const findUser = await UserModel.findOne({where:{companyId,id}})
    console.log(findUser,'findUser');
    
    const previousfirstName = findUser.dataValues.firstName
    console.log(previousfirstName,'previousfirstName');

    const update = await findUser.update({
      firstName:body.firstName,
      lastName:body.lastName,
      email:body.email
    }) 

    const newfirstName = update.dataValues.firstName
    console.log(newfirstName,'newfirstName');

    const establishment = await EstablishmentModel.findAll({
      where: {
        companyId
      }
    });
    

    for (let est of establishment) {
      // Split departmentTitle and departmentSuffix into arrays
      let estReviewers = est.reviewer ? est.reviewer.split(',').map(firstName => firstName.trim()) : [];
      let estApprovers = est.approver ? est.approver.split(',').map(firstName => firstName.trim())  : [];
      
      // Check if any title matches the old department title
      let reviewerUpdated = false;
      estReviewers = estReviewers.map(firstName => {        
        if (firstName == previousfirstName) {
          
          reviewerUpdated = true;

          return newfirstName; // Update with the new title
        }
        return firstName;
      });
    
      // Check if any suffix matches the old department suffix
      let approverUpdated = false;
      estApprovers = estApprovers.map(firstName => {

        if (firstName == previousfirstName) {

          approverUpdated = true;

          return newfirstName; // Update with the new suffix
        }
        return firstName;
      });
    
      // If either the title or suffix has been updated, save the changes to the project
      if (approverUpdated || reviewerUpdated) {
        console.log("updated");
        await est.update({
          reviewer: estReviewers.join(','), // Join updated titles into a comma-separated string
          approver: estApprovers.join(',') // Join updated suffixes into a comma-separated string
        });
      }
    }
    
    return res.status(200).send({message:"User Updated Succesfully"});

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    console.log('howru');
    
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
    // console.log(departmentId,"ayiiii");
    if (departmentId) {
      // console.log(departmentId,"ayiiiiiiiiiiiiii");
      const users = await UserModel.findAll({
        where: {  companyId,departmentId},
      });
      // console.log(users,"users");
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
        // console.log(department);
  
        if (item.roleId == 1) roleTitle = "CEO";
        else if (item.roleId == 2) roleTitle = "Head";
        else if (item.roleId == 3) roleTitle = "Senior";
        else if (item.roleId == 4) roleTitle = "Junior";
        else if (item.roleId == 5) roleTitle = "Designer";
        else if (item.roleId == 6) roleTitle = "Client";

        else roleTitle == "Client";
        if(department!== null){
        
          // console.log('hi');
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
      // console.log('mydata',data);
      return res.status(200).send(data);  
    }
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


// module.exports.notifications = async(req,res)=>{
//   console.log('hitted ');
//   try {
//     const mdrs = await MDRModel.findAll({
//       where:{
//         companyId:req.query.companyId
//       }
//     })
//     console.log(mdrs,'mdrssss');
//   } catch (error) {
//     res.status(500).send({ message: error.message });

//   }
// }


module.exports.company = async(req,res)=>{
  try {
    const company = await CompanyModel.findOne({
      where:{
        id:req.query.companyId
      }
    })
    return res.status(200).send(company.name);  

  } catch (error) {
    res.status(500).send({ message: err.message });

  }
}


module.exports.uploadImage = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const imageInfo = req.file.filename;
      console.log(imageInfo, "imageInfo");

      const userId = req.body.id;
      const image = await UserModel.update(
        { profileImage: imageInfo },
        { where: { id: userId } }
      );

      console.log(image, "image");

      res.status(200).send("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error uploading image");
    }
  });
};


module.exports.profile = async (req, res) => {
  try {
    // console.log(req.query, 'Request query parameters');
    // const userId = req.query.id;
    // const image = await UserModel.findOne({ where: { id: userId } });
    // console.log(image, "Retrieved image");

    // if (!image) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    res.status(200).json({ status: "Ok", image: image.profileImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user profile" });
  }
};




module.exports.deleting = async(req,res)=>{
  console.log("hot");
  try {
    const deleting = req.query.delete
    const recordId = req.query.recordId
console.log(deleting,recordId,'ids');

  if (deleting == "1") {
    const user_to_delete = await UserModel.findOne({ where: { id: recordId } });
    // console.log(user_to_delete, 'user_delete');
  
    const user = await UserModel.update(
       {removed: true},{where: { id: recordId }},
    );
    // console.log(user,'user');
  
    const approvalCount = await EstablishmentModel.findAll({
      where: {
        companyId: req.query.companyId
      }
    });
  
    const updatePromises = approvalCount.map(async establishment => {
      const id = establishment.dataValues.id;
      const reviewerIds = establishment.dataValues.reviewerId.split(',').map(id => id.trim());
      const approverIds = establishment.dataValues.approverId.split(',').map(id => id.trim());
      const reviewerStatuses = establishment.dataValues.reviewerStatus.split(',').map(status => status.trim());
      const approverStatuses = establishment.dataValues.approverStatus.split(',').map(status => status.trim());
      const reviewerComments = establishment.dataValues.reviewerComment.split(',').map(comment => comment.trim());
      const approverComments = establishment.dataValues.approverComment.split(',').map(comment => comment.trim());
  
      const reviewerIndex = reviewerIds.indexOf(recordId);
      const approverIndex = approverIds.indexOf(recordId);
      // console.log(reviewerIndex, approverIndex, 'Indexes');
  
      if (reviewerIndex !== -1) {
        // Remove IDs and their positions from status and comments
        reviewerIds.splice(reviewerIndex, 1);
        reviewerStatuses.splice(reviewerIndex, 1);
        reviewerComments.splice(reviewerIndex, 1);
      }
      if (approverIndex !== -1) {
        approverIds.splice(approverIndex, 1);
        approverStatuses.splice(approverIndex, 1);
        approverComments.splice(approverIndex, 1);
      }
  
      const approverId = approverIds.join(",");
      const reviewerId = reviewerIds.join(",");
      const approverStatus = approverStatuses.join(",");
      const reviewerStatus = reviewerStatuses.join(",");
      const approverComment = approverComments.join(",");
      const reviewerComment = reviewerComments.join(",");
  
      await EstablishmentModel.update(
        {
          approverId, 
          reviewerId, 
          approverStatus, 
          reviewerStatus, 
          approverComment, 
          reviewerComment
        },
        {
          where: {
            id: id
          }
        }
      );
    });
  
    await Promise.all(updatePromises);
    return res.status(200).send({ message: "User Deleted" });
  }    
    if(deleting == "2"){
      const department_to_delete = await DepartmentModel.findOne(
        { where: { id: recordId } }
      );
      const users = await UserModel.findAll({
        where: { departmentId: department_to_delete.id }
      });
      
      for (let user of users) {
        user.departmentId = null; // or "", depending on your preference
        user.department = null; // or "", depending on your preference

        await user.save();
      }
      

      console.log(department_to_delete,'department_delete');
        const department = await DepartmentModel.update(
          { removed: true },
          { where: { id: recordId } }
        );
        return res.status(200).send({ message: "Department Deleted" });

    }
    if(deleting == "3"){
      const project_to_delete = await ProjectModel.findOne(
        { where: { id: recordId } }
      );
      console.log(project_to_delete,'department_delete');
        const project = await ProjectModel.update(
          { removed: true },
          { where: { id: recordId } }
        );
        return res.status(200).send({ message: "Project Deleted" });

    }
    if(deleting == "4"){
      const mdr_to_delete = await MDRModel.findOne(
        { where: { id: recordId } }
      );
      // console.log(mdr_to_delete,'department_delete');
        const mdr = await MDRModel.update(
          { removed: true },
          { where: { id: recordId } }
        );
        return res.status(200).send({ message: "MDR Deleted" });

    }

    if(deleting == "5"){
      const document_to_delete = await DocumentModel.findOne(
        { where: { id: recordId } }
      );
      console.log(document_to_delete,'department_delete');
        const document = await DocumentModel.update(
          { removed: true },
          { where: { id: recordId } }
        );
            return res.status(200).send({ message: "document Deleted" });
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
}

