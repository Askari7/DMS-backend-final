const db = require("../../models/index");
const ProjectModel = db.projects;
const SystemLogModel = db.system_logs;
const DepartmentModel = db.departments
const DocumentModel = db.documents
const MDRModel = db.master_document_registers;
const EstablishmentModel = db.establishments;

module.exports.createProject = async (req, res) => {
  try {
    console.log(req.body);
      req.body.noOfUsers = 0
      const departments = req.body.departments
      const departmentId = req.body.departmentId
      req.body.departmentIds = departmentId.join(",")
      req.body.departmentSuffix = departments.map(department => department.suffix).join(', ');
      req.body.departmentTitle = departments.map(department => department.title).join(', ');
      console.log(req.body);
      await ProjectModel.create(req?.body);
      await SystemLogModel.create({
        companyId: req?.body?.companyId,
        title: `${req?.body?.authorName} Created Project ${req?.body?.title}`,
      });
    return res.status(200).send({ message: "Project has been Created" });
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


const projectIds = projects.map(project => project.dataValues.id);

// Calculate document progress for each project
const documentProgress = projectIds.map(async projectId => {
// Fetch total counts of documents for the project
const totalDocuments = await DocumentModel.count({
where: { projectId }
});

console.log(documentProgress,"totalDocuments");

// Fetch counts of completed documents for the project
const completedDocuments = await DocumentModel.count({
where: { projectId, status: 'Completed' }
});
console.log(completedDocuments,"completedDocuments");

// Calculate percentage of completed documents
const percentage = (completedDocuments / totalDocuments) * 100;

return { projectId, percentage };
});

// Await all document progress calculations to complete
const documentProgressResults = await Promise.all(documentProgress);

console.log(documentProgressResults,'results aye ');


const combinedData = projects.map(project => {
  const departmentName = departmentMap[project.dataValues.departmentId];
  return {
    ...project.dataValues,
    departmentName: departmentName || 'Unknown' // Handle cases where departmentName is not found
  };
});

const combinedDataWithPercentage = combinedData.map(item => {
  const percentageObj = documentProgressResults.find(p => p.projectId === item.id);
  return {
    ...item,
    percentage: percentageObj ? percentageObj.percentage : 0
  };
});
console.log(combinedDataWithPercentage,"combinedData");
console.log(combinedData);
    return res.status(200).send(combinedDataWithPercentage);
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




module.exports.list=async(req,res)=>{
  const id = req.query.companyId
  try {
    const projectCount = await ProjectModel.count({ where: { companyId: id } });
    const mdrCount = await MDRModel.count({ where: { companyId: id } });
    
    const projects = await ProjectModel.findAll({ where: { companyId: id } });
    const mdrs = await MDRModel.findAll({ where: { companyId: id } });
    const departments = await DepartmentModel.findAll({where:{companyId:id}})
    const establishments = await EstablishmentModel.findAll({where:{companyId:id}})

    const projectsStatusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});
    
    const mdrsStatusCounts = mdrs.reduce((acc, mdr) => {
      acc[mdr.status] = (acc[mdr.status] || 0) + 1;
      return acc;
    }, {});
    // Extract project IDs
    const projectIds = projects.map(project => project.id);

    const documentsByProject = [];
    // Iterate over each project and find associated documents
    for (const projectId of projectIds) {
      const documents = await DocumentModel.findAll({ where: { projectId } });
      console.log(documents);
      // Flatten documents array before pushing it
      documentsByProject.push(documents);
    }

    console.log("data",documentsByProject,projectIds);
    return res.status(200).send({projectCount:projectCount,mdrCount:mdrCount
      ,projects:projects,mdrs:mdrs,projectsStatusCounts
      ,mdrsStatusCounts,documents:documentsByProject,departments,establishments})
  } catch (error) {
    console.error(error)
  }
}

module.exports.progress = async (req, res) => {
  try {
    



    res.status(200).json({
      documentProgressResults
    })
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};