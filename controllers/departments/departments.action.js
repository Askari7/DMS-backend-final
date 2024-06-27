// const { Op } = require('sequelize');
// const Sequelize = require('sequelize');
// const db = require("../../models/index");
// const { log } = require('lumie/src/logger');
// const DepartmentModel = db.departments;
// const MDRModel = db.master_document_registers;
// const ProjectModel = db.projects;
// const UserModel = db.users;
// const SystemLogModel = db.system_logs;
// const DepartmentUserAssociation = db.department_user_associations;

// module.exports.createDepartment = async (req, res) => {
//   try {
//     console.log('dept body',req.body);
//     console.log(req.body.title);
    
//     if(Array.isArray(req.body.title) && Array.isArray(req.body.suffix)){
//       console.log(req.body.title.length,req.body.suffix.length);
//       var deptArray=req.body.title;
//       var deptSuffix=req.body.suffix;
//      for (let index = 0; index < deptArray.length; index++) {
//       let mySuffix=deptSuffix[index];
//       let element = deptArray[index];
//       console.log(element)
//       req.body.title=element
//       req.body.suffix=mySuffix
//       // req.body.authorId = 1
//       console.log(req.body.title,req.body.suffix);
//       console.log('check change',req.body);
//       req.body.noOfUsers = 0;
//       console.log(req.body);
//       await DepartmentModel.create(req?.body);
//       await SystemLogModel.create({
//         companyId: req?.body?.companyId,
//         title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
//       });
//     } }
//     else{
//     await DepartmentModel.create(req?.body);
//     await SystemLogModel.create({
//       companyId: req?.body?.companyId,
//       title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
//     });
//   }
//     return res.status(200).send({ message: "Department has been Created" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };
// module.exports.associateUserDepartment = async (req, res) => {
//   try {
//     await DepartmentUserAssociation.create(req?.body);
//     console.log(req.body);
//     const id = req?.body.departmentId;
//     const departmentUpdate = await DepartmentModel.findOne({
//       where: { id },
//     });
//     const updatedDepartment = await departmentUpdate.update({
//       noOfUsers: departmentUpdate.noOfUsers + 1,
//     });
//     console.log(updatedDepartment);
//     await SystemLogModel.create({
//       companyId: req?.body?.companyId,
//       title: `${req?.body?.authorName} associated with Department ${req?.body?.title}`,
//     });
//     return res.status(200).send({ message: "User associated with Department" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.listDepartments = async (req, res) => {
//   try {
//     console.log("Here it is");
//     const departments = await DepartmentModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });

//     console.log(departments);

//     const leads = await UserModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });

//     const headLeads = leads.filter((lead) => lead.roleId === 2 && departments.some(dep => dep.title === lead.department));

//     const departmentCounts = await UserModel.findAll({
//       where: { companyId: req?.query?.companyId },
//       attributes: ['department', [Sequelize.fn('COUNT', Sequelize.literal('1')), 'count']],
//       group: ['department'],
//     });

//     const usersDepartmentCount = {};
//     departmentCounts.forEach((department) => {
//       usersDepartmentCount[department.department] = department.get('count');
//     });

//     const updatedDepartments = departments.map((department) => {
//       const departmentName = department.get('title');

//       // Find headLeads for the current department
//       const departmentHeadLeads = headLeads
//         .filter((lead) => lead.department === departmentName)
//         .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
//         .join(', ');

//       return {
//         ...department.toJSON(),
//         noOfUsers: usersDepartmentCount[departmentName] || 0,
//         headLeads: departmentHeadLeads,
//       };
//     });

//     console.log(updatedDepartments, 'updated departments');
//     return res.status(200).send(updatedDepartments);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.listCounts = async (req, res) => {
//   try {
//     console.log(req.query.userId,"userId by front");
//     const department = await DepartmentModel.findOne({
//       where: { id: req?.query?.departmentId }
//     });
//     console.log(department,"department proejct");
    
//     const mdr = await ProjectModel.count({
//       where: {
//         departmentIds: {
//           [Op.substring]: `${department.id}`
//         }
//       }
//     });
//     console.log(mdr,"mdr project check");

//     const mdrAssigned = await MDRModel.count({
//       where: {
//         status: "Assigned",
//         authorId: req.query.userId// Assuming authorId is a numeric field
//       }
//     });

//     if (!department) {
//       return res.status(404).send({ message: 'Department not found' });
//     }

//     return res.status(200).send({ noOfUsers: department.noOfUsers,departmentProjects:mdr ,mdrAssigned:mdrAssigned});
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


// module.exports.updateUser = async (req, res) => {
//   try {
//     const companyId = req?.query?.companyId;

//     // Fetch the department
//     const department = await DepartmentModel.findOne({
//       where: { companyId },
//     });

//     if (!department) {
//       return res.status(404).send({ message: 'Department not found' });
//     }

//     const updatedDepartment = await department.update({
//       noOfUsers: department.noOfUsers + 1,
//     });

//     return res.status(200).send(updatedDepartment);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const db = require("../../models/index");
const DepartmentModel = db.departments;
const MDRModel = db.master_document_registers;
const ProjectModel = db.projects;
const UserModel = db.users;
const SystemLogModel = db.system_logs;
const DepartmentUserAssociation = db.department_user_associations;

module.exports.createDepartment = async (req, res) => {
  try {
    console.log('dept body',req.body);
    console.log(req.body.title);
    
    if(Array.isArray(req.body.title) && Array.isArray(req.body.suffix)){
      console.log(req.body.title.length,req.body.suffix.length);
      var deptArray=req.body.title;
      var deptSuffix=req.body.suffix;
      for (let index = 0; index < deptArray.length; index++) {
      let mySuffix=deptSuffix[index];
      let element = deptArray[index];
      console.log(element)
      req.body.title=element
      req.body.suffix=mySuffix
      // req.body.authorId = 1
      console.log(req.body.title,req.body.suffix);
      console.log('check change',req.body);
      req.body.noOfUsers = 0;
      console.log(req.body);
      await DepartmentModel.create(req?.body);
      await SystemLogModel.create({
        companyId: req?.body?.companyId,
        title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
      });
    } }
    else{
    await DepartmentModel.create(req?.body);
    await SystemLogModel.create({
      companyId: req?.body?.companyId,
      title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
    });
  }
    return res.status(200).send({ message: "Department has been Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.associateUserDepartment = async (req, res) => {
  try {
    await DepartmentUserAssociation.create(req?.body);
    console.log(req.body,'association body');
    const id = req?.body.departmentId;
    const userId = req?.body.userId;

    const userUpdate = await UserModel.findOne({
      where: { id:userId },
    });
    
    const departmentUpdate = await DepartmentModel.findOne({
      where: { id },
    });
    const lastDepartmentUpdate = await DepartmentModel.findOne({
      where: { id:userUpdate.departmentId },
    });
    const updatedLastDepartment = await lastDepartmentUpdate.update({
      noOfUsers: departmentUpdate.noOfUsers - 1,
    });
    const updatedDepartment = await departmentUpdate.update({
      noOfUsers: departmentUpdate.noOfUsers + 1,
    });
    const userDepartmentUpdate = await userUpdate.update({
      departmentId:updatedDepartment.id
    });
    await SystemLogModel.create({
      companyId: req?.body?.companyId,
      title: `${req?.body?.authorName} associated with Department ${req?.body?.title}`,
    });
    return res.status(200).send({ message: "User associated with Department" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listDepartments = async (req, res) => {
  try {
    const departments = await DepartmentModel.findAll({
      where: { companyId: req?.query?.companyId },
    });

    console.log(departments,"departments");

    const leads = await UserModel.findAll({
      where: { companyId: req?.query?.companyId },
    });

    console.log(leads,"users");
    
    const headLeads = leads.filter((lead) => lead.roleId == 2 && departments.some(dep => dep.id == lead.departmentId));

    console.log(headLeads,'heADS');

    const departmentCounts = await UserModel.findAll({
      where: { companyId: req?.query?.companyId },
      attributes: ['departmentId', [Sequelize.fn('COUNT', Sequelize.literal('1')), 'count']],
      group: ['departmentId'],
    });
    console.log(departmentCounts,"counts");
    const usersDepartmentCount = {};
    departmentCounts.forEach((department) => {
      usersDepartmentCount[department.departmentId] = department.get('count');
    });
    console.log(usersDepartmentCount,"userCounts");
    const updatedDepartments = departments.map((department) => {

      const departmentId = department.get('id');
      // Find headLeads for the current department
      const departmentHeadLeads = headLeads
        .filter((lead) => lead.departmentId == departmentId)
        .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
        .join(', ');

      return {
        ...department.toJSON(),
        noOfUsers: usersDepartmentCount[departmentId] || 0,
        headLeads: departmentHeadLeads,
      };
    });

    console.log(updatedDepartments, 'updated departments');
    return res.status(200).send(updatedDepartments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listCounts = async (req, res) => {
  try {
    console.log(req.query.userId,"userId by front");
    const department = await DepartmentModel.findOne({
      where: { id: req?.query?.departmentId }
    });
    console.log(department,"department proejct");
    
    const mdr = await ProjectModel.count({
      where: {
        departmentIds: {
          [Op.substring]: `${department.id}`
        }
      }
    });
    console.log(mdr,"mdr project check");

    const mdrAssigned = await MDRModel.count({
      where: {
        status: "Assigned",
        authorId: req.query.userId// Assuming authorId is a numeric field
      }
    });

    if (!department) {
      return res.status(404).send({ message: 'Department not found' });
    }

    return res.status(200).send({ noOfUsers: department.noOfUsers,departmentProjects:mdr ,mdrAssigned:mdrAssigned});
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};