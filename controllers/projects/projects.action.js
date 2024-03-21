const db = require("../../models/index");
const ProjectModel = db.projects;
const SystemLogModel = db.system_logs;
const DepartmentModel = db.departments
const DocumentModel = db.documents
const MDRModel = db.master_document_registers;

module.exports.createProject = async (req, res) => {
  try {
    console.log(req.body.startedDate,req.body.endedDate,"dates",typeof(req.body.startedDate));
      req.body.noOfUsers = 0
      await ProjectModel.create(req?.body);
      await SystemLogModel.create({
        companyId: req?.body?.companyId,
        title: `${req?.body?.authorName} Created Project ${req?.body?.title}`,
      });
    return res.status(200).send({ message: "Projects Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.createDepartment = async (req, res) => {
  try {
    console.log('dept body',req.body);
    console.log(req.body.title);
    
    if(Array.isArray(req.body.title)){
      console.log(req.body.title.length);
      var deptArray=req.body.title;
     for (let index = 0; index < deptArray.length; index++) {

      let element = deptArray[index];
      console.log(element)
      req.body.title=element
      console.log(req.body.title);
      console.log('check change',req.body);
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
    return res.status(200).send({ message: "Departments Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listProjects = async (req, res) => {
  try {
    
    const projects = await ProjectModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    const departmentIds = projects.map(project => project.dataValues.departmentId);

console.log(departmentIds);
const departments = await DepartmentModel.findAll({
  where: {
    id: departmentIds
  }
});
const departmentNames = departments.map(department => (department.dataValues.id,department.dataValues.title));
const departmentMap = {};
departments.forEach(department => {
  departmentMap[department.dataValues.id] = department.dataValues.title;
});
console.log(departmentMap);
console.log(departmentNames);
const combinedData = projects.map(project => {
  const departmentName = departmentMap[project.dataValues.departmentId];
  return {
    ...project.dataValues,
    departmentName: departmentName || 'Unknown' // Handle cases where departmentName is not found
  };
});

console.log(combinedData);
    return res.status(200).send(combinedData);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.listInformation = async (req, res) => {
  try {
    const projects = await ProjectModel.findAll({
      where: { companyId: req?.query?.companyId },
    });

    console.log("projects", projects);

    const mdr = await MDRModel.findAll({
      where: { companyId: req?.query?.companyId },
    });

    const mdr_projects = mdr.map(mdr => mdr.dataValues.projectId);
    console.log("mdrProjects", mdr_projects);

    const documents = await DocumentModel.findAll({
      where: {
        companyId: req?.query?.companyId,
        masterDocumentId: mdr.map(m => m.dataValues.mdrCode), // Get masterDocumentIds from MDR
      },
    });

    // Combine projects with mdr based on projectId
    const combinedProjects = projects.map(project => {
      const matchingMdr = mdr.find(mdrItem => mdrItem.dataValues.projectId === project.dataValues.id);
      
      // Filter documents based on mdrCode and masterDocumentId
      const matchingDocuments = documents.filter(doc =>
        doc.masterDocumentId === (matchingMdr ? matchingMdr.dataValues.mdrCode : null)
      );

      return {
        ...project.dataValues,
        ...(matchingMdr
          ? {
              departmentId: matchingMdr.dataValues.departmentId,
              departmentName: matchingMdr.dataValues.departmentName,
              mdrCode: matchingMdr.dataValues.mdrCode,
              noOfDocuments: matchingMdr.dataValues.noOfDocuments,
              projectCode: matchingMdr.dataValues.projectCode,
              title: matchingMdr.dataValues.title,
            }
          : null),
        documents: matchingDocuments,
      };
    });

    console.log("combinedProjects", combinedProjects);
    res.send(combinedProjects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


// module.exports.listInformation = async (req, res) => {
//   try {
//     const Projects = ProjectModel.findAll(
//       {where:companyId:req?.query?.companyId}
//       )
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };




