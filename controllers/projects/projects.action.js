const { where, Op } = require("sequelize");
const db = require("../../models/index");
const ProjectModel = db.projects;
const SystemLogModel = db.system_logs;
const DepartmentModel = db.departments
const ClientOfficialModel = db.clientOfficials;
const ClientModel = db.clients;

const DocumentModel = db.documents
const MDRModel = db.master_document_registers;
const EstablishmentModel = db.establishments;
const UserModel = db.users;

module.exports.createProject = async (req, res) => {
  try {
    const findProject = await ProjectModel.findOne({
      where: {
        companyId: req.body.companyId,
        clientId: req.body.clientId,
        [Op.or]: [
          { title: req.body.title },
          { code: req.body.code }
        ]
      }
    });
    
    if (findProject) {
      return res.status(409).send({ message: "Project with same name or code already exist" });
    }


    console.log(req.body);
      req.body.noOfUsers = 0
      const departments = req.body.departments
      
      const departmentId = req.body.departmentId
      req.body.departmentIds = departmentId.join(",")
      req.body.removed = false

      req.body.departmentSuffix = departments.map(department => department.suffix).join(', ');
      req.body.departmentTitle = departments.map(department => department.title).join(', ');
      console.log(req.body);
      await ProjectModel.create(req?.body);
      const departmentIds = req.body.departmentIds.split(',');

      await Promise.all(
        departmentIds.map(async (departmentId) => {
          const user = await  UserModel.findOne({
            where:{
              roleId:2,
              departmentId:departmentId
            }
          })
          await SystemLogModel.create({
            companyId: req.body.companyId,
            typeOfLog: 5,
            userId:user? user.id:"",
            departmentId: departmentId.trim(), // Trim to remove any leading/trailing whitespace
            title: `${req.body.authorName} Created Project ${req.body.title}`,
          });
        })
      );
    return res.status(200).send({ message: "Project has been Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.projectUpdate = async (req, res) => {
  try {
    console.log("here it isz");
    
    const body = req.body
    const {companyId,id} = req.query
    const findDepartment = await ProjectModel.findOne({where:{companyId,id}})
    const update = await findDepartment.update({
      title:body.title,
      code:body.code
    }) 

    return res.status(200).send({message:"Department Updated Succesfully"});

  } catch (err) {
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

// module.exports.listProjects = async (req, res) => {
//   try {
//     const projects = await ProjectModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });
//     const projectIds = projects.map(project => project.dataValues.id);
//     console.log(projectIds,'projectIds');

//     if (req.query.roleId==1) {
//       let departmentMap = {};

//       let departmentIds = projects.map(project => project.dataValues.departmentIds);
//       for (let index = 0; index < departmentIds.length; index++) {
//         const departmentId = departmentIds[index].split(",");
//         for (let i = 0; i < departmentId.length; i++) {

//           const department = await DepartmentModel.findAll({
//           where: {
//             id: departmentId[i]
//           }
//         });
//         departmentMap[department.id] = department.title;
//         }
//       }  
//       const combinedData = projects.map(project => {
//         for (let index = 0; index < departmentIds.length; index++) {
//           const departmentId = departmentIds[index].split(",");
//           for (let i = 0; i < departmentId.length; i++) {
//             const departmentName = departmentMap[departmentId[i]];
//             const p = {...project.dataValues,departmentName: departmentName || 'Unknown'} 
//             return p
//           }
//         }
//       });
       

//       const documentProgress = projectIds.map(async projectId => {
//         const totalDocuments = await DocumentModel.count({
//         where: { projectId }
//         });
//         console.log(documentProgress,"totalDocuments");
//         const completedDocuments = await DocumentModel.count({
//         where: { projectId, status: 'Completed' }
//         });
//         const percentage = (completedDocuments / totalDocuments) * 100;
//         return { projectId, percentage };
//         });
    
//         // Await all document progress calculations to complete
//         const documentProgressResults = await Promise.all(documentProgress);
//         console.log(documentProgressResults,'results aye ');
    

//         const combinedDataWithPercentage = combinedData.map(item => {
//           const percentageObj = documentProgressResults.find(p => p.projectId === item.id);
//           return {
//             ...item,
//             percentage: percentageObj ? percentageObj.percentage : 0
//           };
//         });
//         console.log(combinedDataWithPercentage,'combinedDataWithPercentage');
        
//         return res.status(200).send(combinedDataWithPercentage);
        
//         }    
        


//     else if(req.query.roleId==6){

//     }
//     else{
//       const user = await UserModel.findOne({
//         where:{
//           id:req.query.id
//         }
//       })

//     }
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


module.exports.listProjects = async (req, res) => {
  try {

    
    const projects = await ProjectModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    console.log(projects,'projectsprojects');
    
    

    if (req.query.roleId == 1) {
      let departmentMap = {};

      let departmentIds = projects.map(project => project.dataValues.departmentIds);
      for (let index = 0; index < departmentIds.length; index++) {
        const departmentId = departmentIds[index].split(",");
        for (let i = 0; i < departmentId.length; i++) {
          const department = await DepartmentModel.findOne({
            where: { id: departmentId[i] }
          });
          departmentMap[department.id] = department.title;
        }
      }

      const combinedData = await Promise.all(
        projects.map(async (project) => {
          const client = await ClientModel.findOne({ where: { id: project.clientId } });
      
          for (let index = 0; index < departmentIds.length; index++) {
            const departmentId = departmentIds[index].split(",");
      
            for (let i = 0; i < departmentId.length; i++) {
              const departmentName = departmentMap[departmentId[i]];
              const p = {
                ...project.dataValues,
                departmentName: departmentName || 'Unknown',
                clientName: client ? client.companyName : 'Unknown',
              };
              return p;
            }
          }
        })
      );
      
      const projectIds = projects.map(project => project.dataValues.id);
      console.log(projectIds, 'projectIds');

      const documentProgress = projectIds.map(async projectId => {
        const totalDocuments = await DocumentModel.count({
          where: { projectId }
        });
        const completedDocuments = await DocumentModel.count({
          where: { projectId, status: 'Completed' }
        });
        const percentage = (completedDocuments / totalDocuments) * 100;
        return { projectId, percentage };
      });

      const documentProgressResults = await Promise.all(documentProgress);
      console.log(documentProgressResults, 'results aye');


      const combinedDataWithPercentage = combinedData.map(item => {
        const percentageObj = documentProgressResults.find(p => p.projectId === item.id);
        return {
          ...item,
          percentage: percentageObj ? percentageObj.percentage : 0
        };
      });
      console.log(combinedDataWithPercentage, 'combinedDataWithPercentage');

      return res.status(200).send(combinedDataWithPercentage);

    } else if (req.query.roleId == 6) {
      console.log(req.query.id,req.query.companyId,'companyId ai ha ye ');
      
      // Fetch the user details based on the provided id
      const client = await ClientOfficialModel.findOne({
        where: {
          clientName: req.query.firstName
        }
      });
      console.log(client,'clientclientclient');
      
      const clientCompany = await ClientModel.findOne({
        where: {
          id: client.companyId
        }
      });
      console.log(clientCompany,'clientCompanyclientCompanyclientCompany');
      


      console.log(client,'client');

      const user = await ClientModel.findOne({
        where: {
          id: client.companyId
        }
      });
      console.log(user,'useruser');

      // Filter projects where clientId matches user.id
      const filteredProjects = projects.filter(project => project.dataValues.clientId == user.id);
      console.log(filteredProjects,'filteredProjects');
      
      const projectIds = filteredProjects.map(project => project.dataValues.id);
      console.log(projectIds,'projectIds');

      let departmentMap = {};
      let departmentIds = filteredProjects.map(project => project.dataValues.departmentIds);

      for (let index = 0; index < departmentIds.length; index++) {
        const departmentId = departmentIds[index].split(",");
        for (let i = 0; i < departmentId.length; i++) {
          const department = await DepartmentModel.findOne({
            where: { id: departmentId[i] }
          });
          departmentMap[department.id] = department.title;
        }
      }

      const combinedData = await Promise.all(
        filteredProjects.map(async (project) => {
          const client = await ClientModel.findOne({ where: { id: project.clientId } });
          const departmentNames = departmentIds.flatMap(id => 
            id.split(",").map(deptId => departmentMap[deptId] || 'Unknown')
          );
      
          return {
            ...project.dataValues,
            departmentNames: departmentNames.join(", "),  // Or handle them as an array
            clientName: client ? client.companyName : 'Unknown',
          };
        })
      );

      const documentProgress = projectIds.map(async projectId => {
        const totalDocuments = await DocumentModel.count({
          where: { projectId }
        });
        const completedDocuments = await DocumentModel.count({
          where: { projectId, status: 'Completed' }
        });
        const percentage = (completedDocuments / totalDocuments) * 100;
        return { projectId, percentage };
      });

      const documentProgressResults = await Promise.all(documentProgress);
      console.log(documentProgressResults, 'results aye');

      const combinedDataWithPercentage = combinedData.map(item => {
        const percentageObj = documentProgressResults.find(p => p.projectId === item.id);
        return {
          ...item,
          percentage: percentageObj ? percentageObj.percentage : 0
        };
      });
      console.log(combinedDataWithPercentage, 'combinedDataWithPercentage');

      return res.status(200).send(combinedDataWithPercentage);

    }else if(req.query.companyId&&!req.query.id){
      const projects = await ProjectModel.findAll({
        where: { companyId: req?.query?.companyId },
      });
      return res.status(200).send(projects);

    }
    
    else {
      // Default case
      const user = await UserModel.findOne({
        where: {
          id: req.query.id
        }
      });

      let departmentMap = {};
      let departmentIds = projects.map(project => project.dataValues.departmentIds);
      let filteredProjects = [];

      for (let index = 0; index < departmentIds.length; index++) {
        const departmentId = departmentIds[index].split(",");
        for (let i = 0; i < departmentId.length; i++) {
          if (departmentId[i] == user.departmentId) {
            const department = await DepartmentModel.findOne({
              where: { id: departmentId[i] }
            });
            departmentMap[department.id] = department.title;

            const p = { ...projects[index].dataValues, departmentName: department.title || 'Unknown' };
            filteredProjects.push(p);

            const totalDocuments = await DocumentModel.count({
              where: { projectId: projects[index].dataValues.id }
            });
            const completedDocuments = await DocumentModel.count({
              where: { projectId: projects[index].dataValues.id, status: 'Completed' }
            });
            const percentage = (completedDocuments / totalDocuments) * 100;

            p.percentage = percentage || 0;
          }
        }
      }
      console.log(filteredProjects,'filteredProjectsfilteredProjects');
      const combinedData = await Promise.all(
        filteredProjects.map(async (project) => {
          const client = await ClientModel.findOne({ where: { id: project.clientId } });
          console.log(client,'clientclient');
          
          return {
            ...project,
            clientName: client ? client.companyName : 'Unknown',
          };
        })
      );
      


      console.log(combinedData, 'filteredProjects');
      return res.status(200).send(combinedData);
    }
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

    // console.log("combinedProjects", combinedProjects);
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
    const projectCount = await ProjectModel.count({ where: { companyId: id,removed: false}});
    const mdrCount = await MDRModel.count({ where: { companyId: id,removed: false}});
    
    const projects = await ProjectModel.findAll({ where: { companyId: id,removed: false}});
    const mdrs = await MDRModel.findAll({ where: { companyId: id } });

    const departments = await DepartmentModel.findAll({
      where: {
        companyId: id,
        removed: false
      }
    });

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