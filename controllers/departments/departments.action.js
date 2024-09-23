const { Op } = require('sequelize');

const Sequelize = require('sequelize');
const db = require("../../models/index");
const departments = require('../../models/departments');
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
      console.log(req.body.title,req.body.suffix);
      console.log('check change',req.body);
      req.body.noOfUsers = 0;
      console.log(req.body);
      const department = await DepartmentModel.create(req?.body);
      
      await SystemLogModel.create({
        companyId: req?.body?.companyId,
        departmentId:department.id,
        typeOfLog:3,
        title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
      });
    } }
    else{
    const department = await DepartmentModel.create(req?.body);
    await SystemLogModel.create({
      companyId: req?.body?.companyId,
      typeOfLog:3,
      departmentId:department.id,
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

    const id = req?.body.departmentId;
    const userId = req?.body.userId
    const companyId = req?.body.companyId

    console.log(id,userId,'userIduserId');

    const user = await UserModel.findOne({
      where:{id: userId,companyId},
    });

    const departmentUpdate = await DepartmentModel.findOne({
      where: { id ,companyId},
    });

    console.log(departmentUpdate,'departmentUpdate');

    const previousDepartmentUpdate = await DepartmentModel.findOne({
      where: { title : user.department,companyId},
    });
    console.log(previousDepartmentUpdate,'previousDepartmentUpdate');

    if(user.roleId==2 && previousDepartmentUpdate.noOfUsers<=1){
      const updatedDepartment = await departmentUpdate.update({
        noOfUsers: departmentUpdate.noOfUsers + 1,
      });
      const updatedUser = await user.update({
        department: updatedDepartment.title,
        departmentId:updatedDepartment.id,
        roleId:3,
      });
      console.log(updatedUser,'updatedUser');
      const previousUpdatedDepartment = await previousDepartmentUpdate.update({
        noOfUsers: previousDepartmentUpdate.noOfUsers -1
        });
    }
    else if(user.roleId==2 && previousDepartmentUpdate.noOfUsers>=1){  
      return res.status(200).send({ message: "Transfer cannot proceed without appointing a new department head." });
    }
    else{
      const updatedDepartment = await departmentUpdate.update({
        noOfUsers: departmentUpdate.noOfUsers + 1,
      });
      const updatedUser = await user.update({
        department: updatedDepartment.title,
        departmentId:updatedDepartment.id,
      });
      const previousUpdatedDepartment = await previousDepartmentUpdate.update({
        noOfUsers: previousDepartmentUpdate.noOfUsers -1
        });
    }
    await DepartmentUserAssociation.create(req?.body);
    await SystemLogModel.create({
      companyId: req?.body?.companyId,
      typeOfLog:4,
      userId:user?.id,
      departmentId:departmentUpdate.id,
      title: `${user?.firstName} ${user?.lastName} transferred to ${departmentUpdate.title} Department`,
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

    const leads = await UserModel.findAll({
      where: { companyId: req?.query?.companyId },
    });

    const headLeads = leads.filter((lead) => lead.roleId === 2 && departments.some(dep => dep.title === lead.department));

    // const departmentCounts = await UserModel.findAll({
    //   where: { companyId: req?.query?.companyId },
    //   attributes: ['department', [Sequelize.fn('COUNT', Sequelize.literal('1')), 'count']],
    //   group: ['department'],
    // });

    // console.log(departmentCounts,'departmentCounts');
    

    // const usersDepartmentCount = {};
    // departmentCounts.forEach((department) => {
    //   usersDepartmentCount[department.department] = department.get('count');
    // });

    const updatedDepartments = departments.map((department) => {
      const departmentName = department.get('title');

      // Find headLeads for the current department
      const departmentHeadLeads = headLeads
        .filter((lead) => lead.department === departmentName)
        .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
        .join(', ');

      return {
        ...department.toJSON(),
        // noOfUsers: usersDepartmentCount[departmentName] || 0,
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


module.exports.updateUser = async (req, res) => {
  try {
    const companyId = req?.query?.companyId;

    // Fetch the department
    const department = await DepartmentModel.findOne({
      where: { companyId },
    });

    if (!department) {
      return res.status(404).send({ message: 'Department not found' });
    }

    const updatedDepartment = await department.update({
      noOfUsers: department.noOfUsers + 1,
    });

    return res.status(200).send(updatedDepartment);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.departmentUpdate = async (req, res) => {
  try {

    const body = req.body;
    const { companyId, departmentId } = req.query;
    
    // Find the department that needs to be updated
    const findDepartment = await DepartmentModel.findOne({ where: { companyId, id: departmentId } });
    const previousTitle = findDepartment.dataValues.title
    const previousSuffix = findDepartment.dataValues.suffix
    console.log(previousSuffix,previousTitle,'Previous');
        
    // Update the department title and suffix
    const update = await findDepartment.update({
      title: body.title,
      suffix: body.suffix
    });

    console.log(update.dataValues.title,update.dataValues.suffix,'Updated');
    
    const updateOne = await DepartmentModel.findOne({
      title: body.title,
      suffix: body.suffix
    });

    const newTitle  = updateOne.dataValues.title
    const newSuffix  = updateOne.dataValues.suffix

    console.log(newTitle,newSuffix,'new');    
    
    // Find all projects for the given companyId
    const findProjects = await ProjectModel.findAll({ where: { companyId } });
    const findMDRs = await MDRModel.findAll({ where: { companyId } });

    for (let project of findProjects) {
      // Split departmentTitle and departmentSuffix into arrays
      let departmentTitles = project.departmentTitle ? project.departmentTitle.split(',').map(title => title.trim()) : [];
      let departmentSuffixes = project.departmentSuffix ? project.departmentSuffix.split(',').map(suffix => suffix.trim())  : [];
      
      // Check if any title matches the old department title
      let titleUpdated = false;
      departmentTitles = departmentTitles.map(title => {        
        if (title == previousTitle) {
          
          titleUpdated = true;

          return newTitle; // Update with the new title
        }
        return title;
      });
    
      // Check if any suffix matches the old department suffix
      let suffixUpdated = false;
      departmentSuffixes = departmentSuffixes.map(suffix => {
console.log(suffix == previousSuffix,'suffix == previousSuffix');

        if (suffix == previousSuffix) {

          suffixUpdated = true;

          return newSuffix; // Update with the new suffix
        }
        return suffix;
      });
    
      // If either the title or suffix has been updated, save the changes to the project
      if (titleUpdated || suffixUpdated) {
        console.log("updated");
        await project.update({
          departmentTitle: departmentTitles.join(','), // Join updated titles into a comma-separated string
          departmentSuffix: departmentSuffixes.join(',') // Join updated suffixes into a comma-separated string
        });
      }
    }
    

    for (let mdr of findMDRs) {


      // Split departmentTitle and departmentSuffix into arrays
      let departmentTitles = mdr.departmentName ? mdr.departmentName.split(',').map(title => title.trim()) : [];
      let titleUpdated = false;
      departmentTitles = departmentTitles.map(title => {
console.log(title ==previousTitle,'title ==previousSuffix');
console.log(title,previousTitle);

        if (title ==previousTitle) {
          
          titleUpdated = true;

          return newTitle; // Update with the new title
        }
        return title;
      });
      // If either the title or suffix has been updated, save the changes to the project
      if (titleUpdated) {
        await mdr.update({
          departmentName: departmentTitles.join(','), // Join updated titles into a comma-separated string
        });
      }
    }
    
    
    return res.status(200).send({message:"Department Updated Succesfully"});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports.notifications = async (req, res) => {
  try {
    const {companyId,userId,departmentId,roleId} = req?.query?.companyId;
    // Fetch the department
    let notifications = []
    if(roleId==1||roleId==6){
       notifications = await SystemLogModel.find({
        where: { companyId,departmentId ,userId},
      });
    }
    else{
      notifications = await SystemLogModel.find({
        where: { companyId,departmentId ,userId},
      });
    }
    

    return res.status(200).send(notifications);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
