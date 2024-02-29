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


// module.exports.listInformation = async (req, res) => {
//   try {
//     const mdr = await MDRModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });
//     const mdr_projects = mdr.map(mdr => mdr.dataValues.projectId);
//     console.log("mdrProjects",mdr_projects);
//     const mdrId = mdr.map(mdr => mdr.dataValues.id);
//     console.log("mdrId",mdrId);
//     const mdrCodes = mdr.map(mdr => mdr.dataValues.mdrCode);
//     console.log("mdrCodes",mdrCodes);
//     const mdr_departments = mdr.map(mdr => mdr.dataValues.departmentId);
//     console.log("mdrDepartments",mdr_departments);
//     const mdr_departments_name = mdr.map(mdr => mdr.dataValues.departmentName);
//     console.log("mdrDepartmentNames",mdr_departments_name);
//     const documents = await DocumentModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });
//     const document = documents.map(documents => documents.dataValues.title);
//     console.log("mdrDocuments",document);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


module.exports.listInformation = async (req, res) => {
  try {
    const mdr = await MDRModel.findAll({
      where: { companyId: req?.query?.companyId },
    });

    // Initialize an empty object to store the aggregated data
    const aggregatedData = {};

    // Iterate through MDR entries
    mdr.forEach(entry => {
      const projectId = entry.dataValues.projectId;
      const mdrId = entry.dataValues.id;

      // Check if the entry exists in the aggregated data object
      if (!aggregatedData[projectId]) {
        // If it doesn't exist, initialize a new entry
        aggregatedData[projectId ] = {
          projectId: projectId,
          mdrId: mdrId,
          departmentNames: [],
          documentTitles: []
        };
      }

      // Push department name to the corresponding entry
      aggregatedData[projectId].departmentNames.push(entry.dataValues.departmentName);
    });

    // Iterate through documents
    const documents = await DocumentModel.findAll({
      where: { companyId: req?.query?.companyId },
    });

    documents.forEach(document => {
      const projectId = document.dataValues.projectId;
      const mdrId = document.dataValues.masterDocumentId;

      // Check if the entry exists in the aggregated data object
      if (aggregatedData[projectId ]) {
        // Push document title to the corresponding entry
        aggregatedData[projectId].documentTitles.push(document.dataValues.title);
      }
    });

    // Convert the object to an array of dictionaries
    const resultArray = Object.values(aggregatedData);

    // Send the result
    res.status(200).json(resultArray);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


