const db = require("../../models/index");
const DocumentModel = db.documents;
const CommentsModel = db.comments;
const EstablishmentModel = db.establishments;

const DepartmentModel = db.departments;
const ProjectModel = db.projects;
const UserModel = db.users;

const MDRModel = db.master_document_registers;
const DocumentPermssionModel = db.user_document_permissions;
const SystemLogModel = db.system_logs;
const CompanyModel = db.company;
const { omit, forEach } = require("lodash");
const sequelize = require("sequelize")
const fs = require("fs");
const Papa = require("papaparse");
const { Sequelize, where } = require('sequelize');
const { Op } = require('sequelize');
const departments = require("../../models/departments");
const { version, title } = require("process");
const e = require("express");

// module.exports.listDocuments = async (req, res) => {
//   console.log("documents bhejoo");
//   // console.log(req.query.assignedBy,req.query.userId,"assigned");
//   try {
//     const companyId = parseInt(req?.query?.companyId);
//     const departmentId = req?.query?.department;
//     const assignedTo = req?.query?.userId;
//     const assignedBy = req?.query?.assignedBy;
//     console.log(departmentId,assignedTo,assignedBy,'ye ha asal ');
    

//     if(departmentId==undefined && !assignedTo ==undefined&&!assignedBy==undefined){
//       const documents = await DocumentModel.findAll({
//         where: {
//           companyId: companyId,
//         }
//       });
//       console.log('1',documents);
//       return res.status(200).send(documents);
//     }
//     console.log(companyId,departmentId,assignedBy,assignedTo,'information');

//     if(req.query.masterDocumentId){
//       console.log('2yaha aya');
//       const documents = await DocumentModel.findAll({
//         where: {
//           companyId: companyId,masterDocumentId:req.query.masterDocumentId,projectId:req.query.projectId
//         }
//       });
//       console.log('1',documents);
//       return res.status(200).send(documents);
//     }

//     else{
//       console.log('3yaha aya');
//       if(assignedTo=='1' || assignedBy=='1'){
//         let documents = await DocumentModel.findAll({
//         where: {
//           companyId: companyId,
//         }
//       });
//       console.log('2',documents);
//       const myAssignedToUsers = documents.map(document => document.dataValues.assignedTo);
//       const users = await UserModel.findAll({
//         where: {
//           id: myAssignedToUsers
//         }
//       });
      
//       // const myDocuments = await Promise.all(documents.map(async document => {
//       //   const assignedToIds =document.assignedTo!= ''|| null && document.assignedTo.split(','); // Split the assignedTo field into an array of IDs
//       //   console.log(assignedToIds,'assignedToIds');
        
//       //   const assignedToNames = assignedToIds.map(id => {
//       //     console.log(id,'id');
          
//       //     const user = users.find(user => user.id == id); // Find the user by ID
          
//       //     return user ? `${user.dataValues.firstName} ${user.dataValues.lastName}` : null; // Get the full name
//       //   }).filter(name => name !== null); // Remove any null values
      
//       //   document.dataValues["assignedToName"] = assignedToNames.join(', '); // Join the names into a comma-separated string
      
//       //   return document;
//       // }));
      
      
//       return res.status(200).send(documents);    
//     }
//     else{
//       console.log("LOG YAHA AYA");
      
//         // let documents = await DocumentModel.findAll({
//         //   where: {
//         //     companyId: companyId,
//         //     departmentId: {
//         //       [Sequelize.Op.like]: `%${departmentId}%` // Using Sequelize operator for LIKE clause
//         //     },
//         //     [Op.or]: [
                
//         //       {
//         //         assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
//         //       }
//         //     ]
//             // [Op.or]: [
//             //   // {
//             //   //   assignedBy: {
//             //   //     [Op.gte]: assignedBy // Matches or greater than assignedBy from query param
//             //   //   }
//             //   // },
//             //   // { 
//             //   //   assignedFrom: assignedTo // Matches assignedTo from query param
//             //   // },
//             //   {
//             //     assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
//             //   }
//             // ]
//         //   }
          
//         // });
// // /////////////////////////KNOWLEDGE/////////////////////////////////////////////////////

// // assigned to is the user id to which doc is assigned
// // assignedBy is ROLEID who has assigned doc to user
// // assigned from is the user ID who has assigned doc to user
//         let documents = await DocumentModel.findAll({
//      where: {
//             companyId: companyId,
            
//             [Op.or]: [
//               {
//                 assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
//               }
//             ],
//             [Op.or]: [
//               {
//                 assignedBy: {
//                   [Op.gte]: assignedBy // Matches or greater than assignedBy from query param
//                 }
//               },
//               { 
//                 assignedFrom: assignedTo // Matches assignedTo from query param
//               },
//               {
//                 assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
//               }
//             ]
//           }
//         });
        
//         console.log(documents,'documentsdocuments');
        
//         // if (documents.length==0) {
//         //   console.log('documentsdocumentsdocumentsdocuments');
          
//         //   documents = await DocumentModel.findAll({
//         //     where: {
//         //       companyId: companyId,
            
              
//         //       [Op.or]: [
                
//         //         {
//         //           assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
//         //         }
//         //       ]
//         //     }
            
//         //   });
          
//         // }
//         console.log('3 data aya ha ',documents);
//         const myAssignedToUsers = documents.map(document => document.dataValues.assignedTo);
  
//         const users = await UserModel.findAll({
//           where: {
//             id: myAssignedToUsers
//           }
//         });
//         // console.log('my users', users);
        
//         const myDocuments = await Promise.all(documents.map(async document => {
//           users.forEach(user => {
//             // Assuming document.assignedTo is a comma-separated string like "1,2,3"
// // And user.dataValues contains id, firstName, and lastName

// if (document.assignedTo) {
//   // Split the assignedTo string into an array of IDs
//   const assignedToIds = document.assignedTo.split(',');
//   console.log(assignedToIds,'assignedToIds');
  
//   // Initialize an array to store matching names
//   const assignedToNames = [];

//   const assignedToNames = await Promise.all(assignedToIds.map(async (id) => {
//     if (id) {
//       const findedUser = await UserModel.findOne({
//         where: {
//           id: id
//         }
//       });
  
//       return findedUser ? findedUser.dataValues.firstName + ' ' + findedUser.dataValues.lastName : null;
//     }
//     return null;
//   }));
  
//   console.log(assignedToIds,'assignedToIds');

//   // If there are any matching names, join them and add to the document's dataValues
//   if (assignedToNames.length > 0) {
//     console.log(assignedToNames,'assignedToNames');

//     document.dataValues["assignedToName"] = assignedToNames.join(', ');
//     // console.log(document, 'doc');
//   }
// }

//           });
//           return document;
//         }));
        
//         console.log(myDocuments, 'mydocs');
//         return res.status(200).send(myDocuments);    }
//   }
//   } catch (err) {
//     console.log('error',err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


module.exports.listDocuments = async (req, res) => {
  console.log("documents bhejoo");
  try {
    const companyId = parseInt(req?.query?.companyId);
    const departmentId = req?.query?.department;
    const assignedTo = req?.query?.userId;
    const assignedBy = req?.query?.assignedBy;
    const masterDocumentId = req?.query?.masterDocumentId;
    const projectId = req?.query?.projectId;

    console.log(departmentId, assignedTo, assignedBy, 'Request Parameters');

    // Handle documents filtering when only companyId is provided
    if (!departmentId && !assignedTo && !assignedBy) {
      const documents = await DocumentModel.findAll({ where: { companyId } });
      console.log('1 - All documents:', documents);
      return res.status(200).send(documents);
    }

    // Handle documents filtering by masterDocumentId and projectId
    if (masterDocumentId) {
      const documents = await DocumentModel.findAll({
        where: { companyId, masterDocumentId, projectId }
      });
      console.log('2 - Documents with masterDocumentId:', documents);
      return res.status(200).send(documents);
    }

    // Advanced filtering based on `assignedTo` and `assignedBy`
    let documents = await DocumentModel.findAll({
      where: {
        companyId,
        [Op.or]: [
          { assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%` } },
          { assignedBy: { [Op.gte]: assignedBy } },
          { assignedFrom: assignedTo }
        ]
      }
    });

    console.log('3 - Filtered documents:', documents);

    if (documents.length === 0) {
      return res.status(404).send({ message: 'No documents found' });
    }

    // Fetch assigned users and map to documents
    const assignedToIds = documents
      .map(document => document.dataValues.assignedTo)
      .filter(Boolean);

    const users = await UserModel.findAll({
      where: {
        id: assignedToIds
      }
    });

    const myDocuments = await Promise.all(
      documents.map(async (document) => {
        if (document.assignedTo) {
          const assignedToIds = document.assignedTo.split(',');
          const assignedToNames = await Promise.all(assignedToIds.map(async (id) => {
            const user = await UserModel.findOne({ where: { id } });
            return user ? `${user.dataValues.firstName} ${user.dataValues.lastName}` : null;
          }));

          // Filter out null values and join names
          document.dataValues["assignedToName"] = assignedToNames.filter(Boolean).join(', ');
        }
        return document;
      })
    );

    console.log('Processed documents with names:', myDocuments);
    return res.status(200).send(myDocuments);
    
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).send({ message: err.message });
  }
};







module.exports.MDRUpdate = async (req, res) => {
  try {
    console.log("here it isz");
    
    const body = req.body
    const {companyId,id} = req.query
    const findDepartment = await MDRModel.findOne({where:{companyId,id}})
    const update = await findDepartment.update({
      title:body.title,
      mdrCode:body.mdrCode
    }) 

    return res.status(200).send({message:"MDR Updated Succesfully"});

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// module.exports.listMDR = async (req, res) => {
//   try {
//     const mdr = await MDRModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });

//     console.log(mdr,"mdr");
//     const projectIds = mdr.map(project => project.dataValues.projectId);

//     console.log(projectIds,"projectIds hain ");
    
// // // Calculate document progress for each project
// const documentProgress = projectIds.map(async projectId => {
// // Fetch total counts of documents for the project
// const totalDocuments = await DocumentModel.count({
// where: { projectId }
// });

// console.log(documentProgress,"totalDocuments");

// // Fetch counts of completed documents for the project
// const completedDocuments = await DocumentModel.count({
// where: { projectId, status: 'Completed' }
// });
// console.log(completedDocuments,"completedDocuments");

// // Calculate percentage of completed documents
// const percentage = (completedDocuments / totalDocuments) * 100;

// return { projectId, percentage };
// });

// // // // Await all document progress calculations to complete
// const documentProgressResults = await Promise.all(documentProgress);

// console.log(documentProgressResults,'results aye ');
// const combinedData = results.map(result => {
//   const mdrEntry = mdr.find(entry => entry.id === result.projectId);
//   return { ...result, ...mdrEntry };
// });

// console.log(combinedData);



//     return res.status(200).send(mdr);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


module.exports.listMDR = async (req, res) => {
  
  try {
    const mdr = await MDRModel.findAll({
      where: { companyId: req?.query?.companyId, removed:false },
    });

    console.log(mdr, "mdr");

    // Extract project IDs from MDR data
    const projectIds = mdr.map(project => project.dataValues.projectId);

    console.log(projectIds, "projectIds");

    // Calculate document progress for each project
    const documentProgress = await Promise.all(projectIds.map(async projectId => {
      // Fetch total counts of documents for the project
      const totalDocuments = await DocumentModel.count({ where: { projectId } });
      console.log(totalDocuments, "totalDocuments");

      // Fetch counts of completed documents for the project
      const completedDocuments = await DocumentModel.count({ where: { projectId, status: 'Approved(in-house)' } });
      console.log(completedDocuments, "completedDocuments");

      // Calculate percentage of completed documents
      const percentage = totalDocuments === 0 ? 0 : (completedDocuments / totalDocuments) * 100;

      return { projectId, percentage };
    }));

    console.log(documentProgress, 'documentProgressResults');

    // Combine document progress with MDR data
    const combinedData = mdr.map(entry => {
      const progressEntry = documentProgress.find(progress => progress.projectId === entry.projectId);
      return { ...entry.dataValues, ...progressEntry };
    });

    console.log(combinedData, 'combinedData');

    return res.status(200).send(combinedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: err.message });
  }
};



// module.exports.listProjects = async (req, res) => {
//   try {
    
//     const projects = await ProjectModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });
//     const departmentIds = projects.map(project => project.dataValues.departmentId);

// console.log(departmentIds);
// const departments = await DepartmentModel.findAll({
//   where: {
//     id: departmentIds
//   }
// });
// const departmentNames = departments.map(department => (department.dataValues.id,department.dataValues.title));
// const departmentMap = {};
// departments.forEach(department => {
//   departmentMap[department.dataValues.id] = department.dataValues.title;
// });
// console.log(departmentMap);
// console.log(departmentNames);


// const projectIds = projects.map(project => project.dataValues.id);

// // Calculate document progress for each project
// const documentProgress = projectIds.map(async projectId => {
// // Fetch total counts of documents for the project
// const totalDocuments = await DocumentModel.count({
// where: { projectId }
// });

// console.log(documentProgress,"totalDocuments");

// // Fetch counts of completed documents for the project
// const completedDocuments = await DocumentModel.count({
// where: { projectId, status: 'Completed' }
// });
// console.log(completedDocuments,"completedDocuments");

// // Calculate percentage of completed documents
// const percentage = (completedDocuments / totalDocuments) * 100;

// return { projectId, percentage };
// });

// // Await all document progress calculations to complete
// const documentProgressResults = await Promise.all(documentProgress);

// console.log(documentProgressResults,'results aye ');


// const combinedData = projects.map(project => {
//   const departmentName = departmentMap[project.dataValues.departmentId];
//   return {
//     ...project.dataValues,
//     departmentName: departmentName || 'Unknown' // Handle cases where departmentName is not found
//   };
// });

// const combinedDataWithPercentage = combinedData.map(item => {
//   const percentageObj = documentProgressResults.find(p => p.projectId === item.id);
//   return {
//     ...item,
//     percentage: percentageObj ? percentageObj.percentage : 0
//   };
// });
// console.log(combinedDataWithPercentage,"combinedData");
// console.log(combinedData);
//     return res.status(200).send(combinedDataWithPercentage);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

module.exports.createMDR = async (req, res) => {
  try {
    const whereCondition = {
      companyId: req.body.companyId,

    };
    
    if (req.body.title) {
      console.log('loglogtitle');

      whereCondition[Op.or] = [
        { title: req.body.title },
        { mdrCode: req.body.mdrCode }
      ];
    } else {
      console.log('loglogtitleloglogtitle');

      whereCondition.mdrCode = req.body.mdrCode;
    }
    console.log('loglogtitleloglogtitleloglogtitleloglogtitle');

    const findProject = await MDRModel.findOne({
      where: whereCondition
    });
    console.log('loglog',findProject);

    if (findProject) {
      console.log('yesyes');
      
      return res.status(409).send({ message: "MDR with same name or code already exist" });
    }

    console.log(req.body);
    const id = req.body.projectId
    const fetchProject = await ProjectModel.findOne({where:{id}})
    console.log(fetchProject,id,"hurrah");
    req.body.departmentId = fetchProject.departmentIds
    req.body.departmentName = fetchProject.departmentTitle
    const mdr = await MDRModel.create(req?.body);
    console.log(mdr);

    const departmentIds = req.body.departmentId.split(',');
    
    await Promise.all(
      departmentIds.map(async (departmentId) => {
        const user = await  UserModel.findOne({
          where:{
            roleId:2,
            departmentId:departmentId
          }
        })
        if(req?.body?.title==undefined){
          const user = await  UserModel.findOne({
            where:{
              roleId:2,
              departmentId:departmentId
            }
          })

          await SystemLogModel.create({
            companyId: req.body.companyId,
            userId:user? user.id:"",
            typeOfLog: 10,
            departmentId: departmentId.trim(), // Trim to remove any leading/trailing whitespace
            title: `MDR creation assigned to ${req?.body?.authorName}`,
          });
        }else{
        await SystemLogModel.create({
          companyId: req.body.companyId,
          userId:user? user.id:"",
          typeOfLog: 6,
          departmentId: departmentId.trim(), // Trim to remove any leading/trailing whitespace
          title: `${req?.body?.authorName} Created MDR ${req?.body?.title}`,
        });
      }
      })
    );

    return res.status(200).send({ message: "Master Document Register Assigned" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.createDocument = async (req, res) => {
  try {
    console.log("working");
    
    // if (req?.body?.roleId != 1) {
    //   const permissionExist = await DocumentPermssionModel.findOne({
    //     where: {
    //       masterDocumentId: req?.body?.masterDocumentId,
    //       userId: req?.body?.userId,
    //       companyId: req?.body?.companyId,
    //       createDocument: 1,
    //     },
    //   });
    //   if (!permissionExist) {
    //     return res.status(403).send({ message: "Permission denied" });
    //   }
    // }
    const docTitle = req.body.docTitle

    const projectCode = req.query.projectCode;
    const areaCode = req.query.areaCode;
    const deptSuffix = req.query.deptSuffix;

    const projectId = req.body.projectId
    console.log(projectId,"Id Check ");

    const projectDepartments =await ProjectModel.findOne({where:{id:projectId}})
    console.log(projectDepartments,'Departments bhi ha');
    req.body.departmentId = projectDepartments.departmentIds

    console.log(req.body,"ye body ha ab");

    const count = await DocumentModel.count({
      where: {
        masterDocumentId: req.body.masterDocumentId
      }
    });
    console.log("approvers",req.body.approver);
    const appName=JSON.parse(req.body.approver);

    const revName=JSON.parse(req.body.reviewer);

    console.log('my approver names',appName);
  console.log(count);

    let docNumber = `${count+1}`
    
    // req.body.title = `${projectCode}-${areaCode}-${deptSuffix}-${docNumber}`
    
    console.log("mybody ",req.body);
    const body = omit(req.body, ["roleId", "userId", "userName"]);
    console.log("body",body)

    const document = await DocumentModel.create(body);

    console.log('created',document);

      req.body.docName=req.body.title;
      req.body.docDepartmentId=req.body.departmentId;
      req.body.docDepartmentName=req.body.departmentName;
      req.body.masterDocumentCode=req.body.masterDocumentId;
      req.body.masterDocumentName=req.body.masterDocumentId;
      req.body.approverId = appName.map(approver => approver.id).join(', ');
      req.body.reviewerId = revName.map(reviewer => reviewer.id).join(', ');
      req.body.approver = appName.map(approver => approver.name).join(', ');
      req.body.reviewer = revName.map(reviewer => reviewer.name).join(', ');
      req.body.approverComment = Array.from({ length: appName.length }).map(() => '').join(', ');
      req.body.reviewerComment  = Array.from({ length: revName.length }).map(() => '').join(', ');
      req.body.approverStatus = Array.from({ length: appName.length }).map(() => 0).join(', ');
      req.body.reviewerStatus = Array.from({ length: revName.length }).map(() => 0).join(', ');
      req.body.status="Initialized";
      const establishments = await EstablishmentModel.create(req.body);
      console.log(establishments);

     
//      for(let i of revName){
//       console.log(revName);
//       console.log(i,i.name,i['name']);
//       const userName= i.name
//       const designation=false;
//        const status=false;

//       req.body.docName=req.body.title;
//       req.body.docDepartmentId=req.body.departmentId;
//       req.body.docDepartmentName=req.body.departmentName;
//       req.body.masterDocumentCode=req.body.masterDocumentId;
//       req.body.masterDocumentName=req.body.masterDocumentId;
//       req.body.userName=userName; 
//       req.body.designation=designation; 
//        req.body.status=status;
//       const establishments = await EstablishmentModel.create(req.body);
// console.log(establishments);

    //  }

    const approvers = req.body.approverId.split(",");

    const departmentIds = req.body.docDepartmentId.split(',');
    // await Promise.all(
    //   departmentIds.map(async (departmentId) => {
    //     await SystemLogModel.create({
    //       companyId: req.body.companyId,
    //       typeOfLog:"7a",
    //       userId:user? user.id:"",
    //       departmentId: departmentId.trim(), // Trim to remove any leading/trailing whitespace
    //       title: log,
    //     });
    //   })
    // );

    await Promise.all(
      departmentIds.map(async (departmentId) => {
        await Promise.all(
          approvers.map(async (approverId) => {
            // await SystemLogModel.create({
            //   companyId: req.body.companyId,
            //   typeOfLog: "7a",
            //   userId: approverId.trim(), // Trim to remove any leading/trailing whitespace
            //   departmentId: departmentId.trim(),
            //   title: `${req?.body?.userName} Created Document ${req?.body?.title}`,
            // });
            await SystemLogModel.create({
              companyId: req.body.companyId,
              typeOfLog: "7a",
              userId: approverId.trim(), // Trim to remove any leading/trailing whitespace
              departmentId: departmentId.trim(),
              title: `You are appointed as approver for Document ${req?.body?.title}`,
            });
          })
        );
      })
    );

    const reviewers = req.body.reviewerId.split(",");
    await Promise.all(
      departmentIds.map(async (departmentId) => {
        await Promise.all(
          reviewers.map(async (reviewerId) => {
            // await SystemLogModel.create({
            //   companyId: req.body.companyId,
            //   typeOfLog: "7b",
            //   userId: reviewerId.trim(), // Trim to remove any leading/trailing whitespace
            //   departmentId: departmentId.trim(),
            //   title: log,
            // });
            await SystemLogModel.create({
              companyId: req.body.companyId,
              typeOfLog: "7b",
              userId: reviewerId.trim(), // Trim to remove any leading/trailing whitespace
              departmentId: departmentId.trim(),
              title: `You are appointed as reviewer for Document ${req?.body?.title}`,
            });
          })
        );
      })
    );

    // if(req.body.status==)
    // const filePath = path.join(
    //   __dirname,
    //   "..",
    //   "..",
    //   "uploads",
    //   `${req?.body?.title}${req?.body?.extension}`
    // );
    // if (req?.body?.extension == ".pdf") {
    //   await createPDF(req?.body?.content, filePath);
    // }
    // if (req?.body?.extension == ".docx") {
    //   await createWordFile(req?.body?.content, filePath);
    // }
    return res.status(200).send({ message: "Document Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.assignDoc = async (req, res) => {
  try {
    const title= req?.query?.docName ;
    const assignedTo=req?.query?.assignedTo ;
    console.log(assignedTo,"assigned Employees");
    const assignedBy=req?.query?.assignedBy ;
    const assignedFrom=req?.query?.assignedFrom ;

    console.log(req.body);

    updatedDocs = await DocumentModel.update(
      { assignedTo: assignedTo, assignedBy: assignedBy,assignedFrom: assignedFrom },
      { where: { title: title } }
    );


    // const user_1 = await UserModel.findOne({
    //   where: {
    //     id: assignedTo,
    //   },
    // });
    // const user_2 = await UserModel.findOne({
    //   where: {
    //     id: assignedFrom,
    //   },
    // });

    // await SystemLogModel.create({
    //   companyId: req.query.companyId,
    //   typeOfLog:11,
    //   userId:user_1.id,
    //   departmentId:user_1.departmentId,
    //   title:`${user_1.firstName} is assigned a document by ${user_2.firstName}`
    // });

    const assignedToIds = assignedTo.split(',');
    console.log(assignedToIds,'assignedToIds');
    
for (let i = 0; i < assignedToIds.length; i++) {
  const user_1 = await UserModel.findOne({
    where: {
      id: assignedToIds[i],
    },
  });

  const user_2 = await UserModel.findOne({
    where: {
      id: assignedFrom,
    },
  });

  await SystemLogModel.create({
    companyId: req.query.companyId,
    typeOfLog: 11,
    userId: user_1.id,
    departmentId: user_1.departmentId,
    title: `${user_1.firstName} is assigned a document by ${user_2.firstName}`,
  });
}

    return res.status(200).send({ message: "Document Assigned" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.checkDoc = async (req, res) => {
  try {
    
    const {docName,version,companyId,masterDocumentCode} = req.query
    console.log(version,'version');
    
    const fetchProject = await EstablishmentModel.findOne({where:{docName,version,companyId,masterDocumentCode}})
    console.log(fetchProject,'fetchProjectfetchProject');
    
    if (fetchProject.status == "Approved(in-house)"&&req.query.roleId==6) {
      return res.status(200).send({status:true});
    }
    return res.status(200).send({ status: true });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.updateMDR = async (req, res) => {
  try {

    const whereCondition = {
      companyId: req.body.companyId,

    };
    
    if (req.body.title) {
      console.log('loglogtitle');

      whereCondition[Op.or] = [
        { title: req.body.title },
        { mdrCode: req.body.mdrCode }
      ];
    } else {
      console.log('loglogtitleloglogtitle');

      whereCondition.mdrCode = req.body.mdrCode;
    }
    console.log('loglogtitleloglogtitleloglogtitleloglogtitle');

    const findProject = await MDRModel.findOne({
      where: whereCondition
    });
    console.log('loglog',findProject);

    if (findProject) {
      console.log('yesyes');
      
      return res.status(409).send({ message: "MDR with same name or code already exist" });
    }


    const id = req.body.projectId
   
    const recordData = JSON.parse(req.body.record);
    console.log(recordData,"recordData");
    const { projectId, projectCode,mdrCode } = recordData;

    const fetchProject = await ProjectModel.findOne({where:{id:projectId}})
    req.body.departmentId = fetchProject.departmentIds
    req.body.departmentName = fetchProject.departmentTitle

    console.log("projectId:", projectId);
    console.log("projectCode:", projectCode);

    delete req.body.record;
    const update = await MDRModel.update(req.body, {
      where: { projectId, projectCode,mdrCode },
    });


    return res.status(200).send({ message: "MDR Updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateReview = async (req, res) => {
  try {
    const body = req.body
    const status = body.clientStatus
    const commnent = body.clientComment
    const version = body.version
    const docName = body.docName
    const app = req.body.app
    const rev = req.body.rev
    const myrecord = req.body.myrecord
    const reviewerIds = myrecord.reviewerId.split(",")
    const approverIds = myrecord.approverId.split(",")
    const companyId = myrecord.companyId
     console.log(myrecord,'myrecord ha ye');
    

    function incrementVersion(versionIn) {
      // Split the version string at the first period ('.')
      const parts = versionIn.split('.');
    
      // Extract the prefix and validate it
      const prefix = parts[0];
    
      if (/^\d{3}$/.test(prefix)) {
        // Increment the prefix
        const incrementedPrefix = (parseInt(prefix) + 1).toString().padStart(3, '0');
        return incrementedPrefix;
      } else {
        // Return the original version if it does not match the expected format
        return versionIn;
      }
    }
        console.log(rev,app,'revAPP hay ');
        

    var incrementFunc;
    if(status=="Reject"){
      console.log(approverIds,reviewerIds,'apprevIDS');
      
      incrementFunc = incrementVersion(version)||version
      const document = await DocumentModel.findOne({where:{ title: docName, version }});

    const updateDocStatus = await DocumentModel.update({version:incrementFunc,status:"Initialized"}, {
      where: { title:  {
        [Sequelize.Op.like]: `%${docName}%`
      }}
    });



    await EstablishmentModel.update(
      { clientStatus:status, clientComment:commnent },
      { where: { docName: docName ,version:version } }
    );


// Create logs for all reviewers
await Promise.all(
  reviewerIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 15,
        userId: user.id,
        departmentId: user.departmentId,
        title: `Document ${docName} rejected by Client `,
      });
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 16,
        title: `Please upload new document ${version} for client!`,
        userId: user.id,
        departmentId: user.departmentId,
      });
    }
  })
);

// Create logs for all approvers
await Promise.all(
  approverIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 15,
        userId: user.id,
        departmentId: user.departmentId,
        title: `Document ${docName} rejected by Client `,
      });
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 16,
        title: `Please upload new document ${version} for client!`,
        userId: user.id,
        departmentId: user.departmentId,
      });
    }
  })
);

    const revsId = myrecord.reviewerId.split(",")
    const appsId = myrecord.approverId.split(",")
    const reviewerStatus = Array.from({ length: revsId.length }).map(() => 0).join(', ');
    const approverStatus = Array.from({ length: appsId.length }).map(() => 0).join(', ');

    const approverComment = Array.from({ length: appsId.length }).map(() => '').join(', ');
    const reviewerComment = Array.from({ length: revsId.length }).map(() => '').join(', ');
    await EstablishmentModel.create({
      docName:myrecord.docName,
      version:incrementFunc,
      reviewer:myrecord.reviewer,
      approver:myrecord.approver,
      approverId:myrecord.approverId,
      reviewerId:myrecord.reviewerId,
      clientStatus:'',
      clientComment:'',
      approverStatus,
      reviewerStatus,
      approverComment,
      reviewerComment,
      companyId:myrecord.companyId,
      docDepartmentId:myrecord.docDepartmentId,
      masterDocumentCode:myrecord.masterDocumentCode,
      masterDocumentName:myrecord.masterDocumentName,
      userName:myrecord.userName
    }
    );
    return res.status(200).send({ message: "Document Rejected" });
    }
    else{
      console.log(approverIds,reviewerIds,'apprevIDS');

      await EstablishmentModel.update(
        { clientStatus:status,clientComment:commnent,status:"Completed"},
        { where: { docName: docName,version:version } }
      );

      
      const docs = await DocumentModel.update(
        { status:"Completed"},
        { where: { title: docName,version:version } }
      );

      const latestDocumentOfDB = await DocumentModel.sequelize.query(
        `SELECT e.*
         FROM Documents e
         INNER JOIN (
           SELECT title, MAX(CAST(version AS DECIMAL)) AS maxVersion 
           FROM Documents
           WHERE companyId = :companyId AND masterDocumentId = :masterDocumentId
           GROUP BY title
         ) groupedDocs
         ON e.title = groupedDocs.title AND CAST(e.version AS DECIMAL) = groupedDocs.maxVersion
         WHERE e.companyId = :companyId AND e.masterDocumentId =:masterDocumentId`,
        {
          replacements: { 
            masterDocumentId:myrecord.masterDocumentCode,
            companyId: myrecord.companyId 
          },
          model: DocumentModel,
          mapToModel: true
        }
      );
      
      console.log(latestDocumentOfDB,"latestDocumentOfDB");
      
      // Check if all documents have clientStatus as "Accept"
      const allAccepted = latestDocumentOfDB.every(doc => doc.dataValues.status=="Completed");
        console.log('hi',allAccepted);
         
      if (allAccepted) {
        const mdrsUpdate = await MDRModel.update(
          { status: 'Completed' },
          { where: { mdrCode: myrecord.masterDocumentCode, companyId: myrecord.companyId } }
        );
        
        // Step 2: Fetch all MDRs for the given companyId and mdrCode
        const allMdrs = await MDRModel.findAll({
          where: {
            companyId: myrecord.companyId,
            mdrCode: myrecord.masterDocumentCode
          }
        });
        console.log(allMdrs,'allMdrs');
        
        // Step 3: Check if all MDR statuses are 'Completed'
        const allCompleted = allMdrs.every(mdr => mdr.status === 'Completed');
        console.log(allAccepted,'allCompleted');
        
        if (allCompleted) {
          // Step 4: If all are completed, update the ProjectModel to 'Ongoing'
          await Promise.all(
            allMdrs.map(async (mdr) => {
              await ProjectModel.update(
                { status: 'Completed' },
                { where: { companyId: myrecord.companyId, id: mdr.projectId } }
              );
            })
          );
        }
       
          // All latest documents have clientStatus as "Accept"
      } else {
       // Step 1: Update the MDRModel where mdrCode and companyId match
      const mdrsUpdate = await MDRModel.update(
        { status: 'Ongoing' },
        { where: { mdrCode: myrecord.masterDocumentCode, companyId: myrecord.companyId } }
      );

      // Step 2: Fetch all MDRs for the given companyId and mdrCode
      const allMdrs = await MDRModel.findAll({
        where: {
          companyId: myrecord.companyId,
          mdrCode: myrecord.masterDocumentCode
        }
      });

      // Step 3: Check if all MDR statuses are 'Completed'
      const allCompleted = allMdrs.every(mdr => mdr.status === 'Completed');

      if (allCompleted) {
        // Step 4: If all are completed, update the ProjectModel to 'Ongoing'
        await Promise.all(
          allMdrs.map(async (mdr) => {
            await ProjectModel.update(
              { status: 'Ongoing' },
              { where: { companyId: myrecord.companyId, id: mdr.projectId } }
            );
          })
        );
      }

      }

await Promise.all(
  reviewerIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 17,
        title: `Client approved document ${docName} version ${version}!`,
        userId: user.id,
        departmentId: user.departmentId,
      });
    }
  })
);

// Create logs for all approvers
await Promise.all(
  approverIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 17,
        title: `Client approved document ${docName} version ${version}!`,
        userId: user.id,
        departmentId: user.departmentId,
      });
    }
  })
);

      return res.status(200).send({ message: "Document Approved" });

    }
    } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.exportDoc=async (req,res)=>{
  try {
    const data = req.body.data;
    const csv = convertToCSV(data); // Assuming convertToCSV is a function that converts data to CSV format
    res.header('Content-Type', 'text/csv');
    res.attachment('export.csv');
    res.send(csv);
} catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}

module.exports.uploadDoc = async (req, res) => {
  try {
    const title = req.body.title;
    console.log(req.body,'chal');
    const log = `${req?.body?.userName} Uploaded Document ${req?.body?.title}`;
    // const body = omit(req.body, ["roleId", "userId", "userName"]);
const status='Uploaded';

    // Update document if it exists, otherwise create a new one
    const updatedDocument = await DocumentModel.update({status}, {
      where: { title:  {
        [Sequelize.Op.like]: `%${title}%`
      }}
    });

console.log('helooo',updatedDocument);
    await SystemLogModel.create({
      title: log,
      typeOfLog:8,
      companyId: req?.body?.companyId,
    });

    return res.status(200).send({ message: "Document uploaded" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.listEstablishment = async (req, res) => {
  console.log(req.query.userId,"req.query.userId");
  console.log(req.query.roleId,"req.query.roleId");
  if(req.query.roleId == 1){
    const establishment = await EstablishmentModel.findAll({
      where: { companyId: req?.query?.companyId,},
    });
  
    const latestDocuments = establishment;
    // console.log(latestDocuments,"latests only");
    return res.status(200).send(latestDocuments);
  }

  if(req.query.roleId == 6){
    console.log("yaha ayega");
    console.log(req.query.companyId,'companyID');
    
    const establishment = await EstablishmentModel.findAll({
      where: { companyId:req.query.companyId , sendToClient:true
      },
     
    });
    // console.log(establishment,'establishing');
    const latestDocuments = establishment;
    // console.log(latestDocuments,'lateststabling');
    return res.status(200).send(latestDocuments);
  }

  if(req.query.docName){
    try {
      const establishment = await EstablishmentModel.findAll({
        where: { companyId: req?.query?.companyId, docName:req.query.docName,
          [Sequelize.Op.or]: [
            {
              approverId: {
                [Sequelize.Op.like]: `%${req?.query?.userId}%`
              }
            },
            {
              reviewerId: {
                [Sequelize.Op.like]: `%${req?.query?.userId}%`
              }
            }
          ]
        },
      });
      const latestDocuments = (establishment);

      return res.status(200).send(latestDocuments);
    } catch (err) {
      console.log('error',err.message);
      res.status(500).send({ message: err.message });
    } 
  }

  try {
  console.log("enter 1");
    const establishment = await EstablishmentModel.findAll({
      where: { companyId: req?.query?.companyId, 
        [Sequelize.Op.or]: [
          {
            approverId: {
              [Sequelize.Op.like]: `%${req?.query?.userId}%`
            }
          },
          {
            reviewerId: {
              [Sequelize.Op.like]: `%${req?.query?.userId}%`
            }
          }
        ]
      },
    });

    
  
  // Call the function with the sample documents array
  const latestDocuments = (establishment);
  
  // Output the latest documents
  // console.log(latestDocuments,"latestones ");

    // console.log(establishment,"establishment ai");
    return res.status(200).send(latestDocuments);
  } catch (err) {
    console.log('error',err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.Accept = async (req, res) => {
  try {
    const {docName,appStatusArr,revStatusArr,app,rev,companyId,reviewerComment,approverComment} = req.body
    console.log(appStatusArr,revStatusArr,'status');
    const versionIn= req.query.version;
    const appIds  = app.split(",")
    const revIds = rev.split(",")
    const appArray=appStatusArr.split(',');
    const revArray=revStatusArr.split(',');
    const revComment = reviewerComment.split(",")
    const appComment = approverComment.split(",")

const document = await DocumentModel.findOne({where:{ title: docName }});
let version = document ? document.version : null;
let status = ''
if(appArray.every(num => num == 2)&&revArray.every(num => num == 2))
  {
  status='Approved(in-house)';
  }
  else if(revArray.every(num => num == 2) && appArray.some(num => num == 0))
    {
    status='Pending for Approval only';
    }
else if (revArray.some(num => num == 0)&& appArray.some(num => num == 0)) {
    status = "Reviewer's and Approver's Status Pending";

} else if (appArray.some(num => num == 0)) {
    status = "Approver's status Pending";
}
else if (revArray.some(num => num == 0)) {
  status = "Reviewer's status Pending";
}


const updateDocStatus = await DocumentModel.update({status,version}, {
  where: { title:  {
    [Sequelize.Op.like]: `%${docName}%`
  }}
});

    const updateCheck = await EstablishmentModel.findOne({
      where: { docName: docName }
    });
    
    if (!updateCheck) {
      return res.status(404).send({ message: "Document not found" });
    }

    await EstablishmentModel.update(
      { approverStatus:appStatusArr,reviewerStatus:revStatusArr,status,reviewerComment,approverComment},
      { where: { docName , version:versionIn } }
    );

    // Create logs for all reviewers
await Promise.all(
  revIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 18,
      title: `Document ${docName} Accepted by ${user.firstName}!`,
        userId: user.id,
        departmentId: user.departmentId,
      });
    }
  })
);

// Create logs for all approvers
await Promise.all(
  appIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 18,
      title: `Document ${docName} Accepted by ${user.firstName}!`,
        userId: user.id,
        departmentId: user.departmentId,
      });
    }
  })
);

    return res.status(200).send({ message: "Document Status updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateDocStatus = async (req, res) => {
  try {
    const {version,userName,approver,reviewer,approverId,reviewerId,companyId,masterDocumentCode,masterDocumentName,docDepartmentId,role} = req.query
    const {docName,revStatusArr,appStatusArr,reviewerComment,approverComment} = req.body
    console.log(version,userName,revStatusArr,appStatusArr,reviewerComment,approverComment,'hitted by api');
    console.log(approver,reviewer,approverId,reviewerId,'info by api');
    function incrementVersion(versionIn) {
      const dotIndex = versionIn.indexOf('.');
      const prefix = dotIndex === -1 ? versionIn : versionIn.substring(0, dotIndex);
      console.log(prefix);
      const incrementValue = 1;
      // Check if the incoming version is exactly the prefix (no dot)
      if (versionIn === prefix) {
        console.log("yes");
          // If version is the prefix without any numeric part, append '.1'
          console.log(prefix+".1");
          return prefix + '.1';
      } else if (versionIn.startsWith(prefix + '.')) {
          // If version is in the form 'prefix.x', increment the numeric part
          const numericPart = versionIn.slice(prefix.length + 1); // Extract the numeric part after 'prefix.'
          console.log(numericPart,'numeric part');
          const incrementedNumeric = parseInt(numericPart) + incrementValue; // Parse and increment the numeric part
          console.log(incrementedNumeric,'incremented');
          console.log(prefix + '.' + incrementedNumeric.toString(),'thats final');
          return prefix + '.' + incrementedNumeric.toString(); // Construct the updated version
      }
      // Return the original version if it does not match the expected format
      return versionIn;
  }

    const updatedVersion = incrementVersion(version);
    
    const updateCheck = await EstablishmentModel.findOne({
      where: { docName,companyId,masterDocumentCode,version }
    });

    if (!updateCheck) {
      return res.status(404).send({ message: "Document not found" });
    }
    
    // Check reviewerStatus for any '0'
    if (updateCheck.reviewerStatus && updateCheck.reviewerStatus.includes('0') && role === "Approver") {
      return res.status(200).send({ message: "Reviewer Status is not completed yet" });
    }


    const appArray=appStatusArr.split(',');
    const revArray=revStatusArr.split(',');

    console.log(appArray,revArray,'arrays of statuses');
    
let status='';

const document = await DocumentModel.findOne({where:{ title: docName }});

if (revArray.some(num => num == 1)) {
    status = 'Reviewers Rejected';
    // console.log(versionForDoc,'versionForDoc');
    
} else if (appArray.some(num => num == 1)) {
    status = 'Approvers Rejected';
    // console.log(versionForDoc,'versionForDoc');

}
else if (appArray.some(num => num == 1) && revArray.some(num => num == 1)){
  status = 'Reviewers and Approvers Rejected';
  // console.log(versionForDoc,'versionForDoc');

}
else if(revArray.every(num => num == 2) &&appArray.every(num => num == 0))
{
status='Pending for Approval';
// version='000';
}

else if(appArray.every(num => num == 2)&&revArray.every(num => num == 2))
{
status='Approved(in-house)';
// version='000';

}

const updateDocStatus = await DocumentModel.update({status,version:updatedVersion}, {
  where: { title:  {
    [Sequelize.Op.like]: `%${docName}%`
  }}
});
    console.log(updateDocStatus,'updateDocStatus');



    
    // Update document with new status values
    await EstablishmentModel.update(
      { reviewerStatus:revStatusArr,approverStatus:appStatusArr, approverComment, reviewerComment ,status,},
      { where: { docName,version} }
    );
const reviewerIds = reviewerId.split(",");
const approverIds = approverId.split(",");

// Create logs for all reviewers
await Promise.all(
  reviewerIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 14,
        userId: user.id,
        departmentId: user.departmentId,
        title: `Document ${docName} version & status updated for reviewer!`,
      });
    }
  })
);

// Create logs for all approvers
await Promise.all(
  approverIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 14,
        userId: user.id,
        departmentId: user.departmentId,
        title: `Document ${docName} version & status updated for approver!`,
      });
    }
  })
);
    
    // Retrieve updated document
    const updatedDocument = await EstablishmentModel.findOne({
      where: { docName,companyId ,masterDocumentCode,version}
    });

    console.log(updatedDocument,'updatedDocumentupdatedDocument');
    
    
    if (!updatedDocument) {
      return res.status(404).send({ message: "Document not found after update" });
    }
    
    // Check if all reviewerStatus and approverStatus are '1'
    const reviewerStatusParts = updatedDocument.reviewerStatus.split(',');
    const approverStatusParts = updatedDocument.approverStatus.split(',');
    
    const allReviewersApproved = reviewerStatusParts.some(part => part.trim());
    const allApproversApproved = approverStatusParts.some(part => part.trim());
    
    if (allReviewersApproved||allApproversApproved) {
      const countApp = appArray.length || 0;
      // Check if 'reviewerId' exists and is a string before splitting
      const countRev = revArray.length || 0;
      // Update 'approverComment' and 'reviewerComment' based on the count
      const approverComment = Array.from({ length: countApp }).map(() => '').join(', ');
      const reviewerComment = Array.from({ length: countRev }).map(() => '').join(', ');

      // Update 'approverStatus' and 'reviewerStatus' based on the count
      const approverStatuses = Array.from({ length: countApp }).map(() => 0).join(', ');
      const reviewerStatuses = Array.from({ length: countRev }).map(() => 0).join(', ');
      console.log(countApp,countRev,"counting");
    const recordData = {
      // Assign specific properties from 'record' to the new record
      docName: docName,
      userName: userName,
      reviewer: reviewer,
      approver: approver,
      version:updatedVersion,
      approverId,reviewerId,
      status:"Initialized",
      approverStatus:approverStatuses,reviewerStatus:reviewerStatuses,approverComment,reviewerComment,companyId,docDepartmentId,masterDocumentCode,masterDocumentName
    };
      
      const newRecord = await EstablishmentModel.create(recordData)
await Promise.all(
  reviewerIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 13,
        userId: user.id,
        departmentId: user.departmentId,
        title: `Please upload new version for Document ${docName}`,
      });
    }
  })
);

// Create logs for all approvers
await Promise.all(
  approverIds.map(async (id, index) => {
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 13,
        userId: user.id,
        departmentId: user.departmentId,
        title: `Please upload new version for Document ${docName}`,
      });
    }
  })
);
      return res.status(200).send({ message: "Please upload a new version now!" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};



module.exports.createPermission = async (req, res) => {
  try {

    console.log(req.body,'reqbody');
    const mdr = await MDRModel.findOne({
      where:{id:req.body.masterDocumentId,companyId:req.body.companyId}
    })
    const documents =await DocumentModel.findAll({
      where:{
        title:req.body.doc,
        masterDocumentId:mdr.mdrCode,
        companyId:req.body.companyId
      }
    })

    const user = await UserModel.findOne({
      where:{
        companyId:req.body.companyId,
        id:req.body.userId
      }
    })
    
    const establishments = await EstablishmentModel.findAll({
      where: {
        docName: req.body.doc,
        masterDocumentCode: mdr.mdrCode,
        companyId: req.body.companyId,
      },
    });
    
    if (req.body.reviewDocument) {
      for (let establishment of establishments) {
        // Split existing values by comma
        let reviewers = establishment.reviewer ? establishment.reviewer.split(',') : [];
        let reviewerIds = establishment.reviewerId ? establishment.reviewerId.split(',') : [];
        let reviewerStatuses = establishment.reviewerStatus ? establishment.reviewerStatus.split(',') : [];
    
        // Add new values
        reviewers.push(user.firstName);
        reviewerIds.push(user.id);
        reviewerStatuses.push('0'); // Status is '0'
    
        // Join them back to comma-separated strings
        establishment.reviewer = reviewers.join(',');
        establishment.reviewerId = reviewerIds.join(',');
        establishment.reviewerStatus = reviewerStatuses.join(',');
    
        // Save the updated establishment
        await establishment.save();
      }
    } else if (req.body.approveDocument) {
      for (let establishment of establishments) {
        // Split existing values by comma
        let reviewers = establishment.approver ? establishment.approver.split(',') : [];
        let reviewerIds = establishment.approverId ? establishment.approverId.split(',') : [];
        let reviewerStatuses = establishment.approverStatus ? establishment.approverStatus.split(',') : [];
    
        // Add new values
        reviewers.push(user.firstName);
        reviewerIds.push(user.id);
        reviewerStatuses.push('0'); // Status is '0'
    
        // Join them back to comma-separated strings
        establishment.approver = reviewers.join(',');
        establishment.approverId = reviewerIds.join(',');
        establishment.approverStatus = reviewerStatuses.join(',');
    
        await establishment.save();
      }    } else {
      
    }
    

    
    
    console.log(documents,'documentsdocuments');
    
    if (req?.body?.createDocument) req.body.reviewDocument = 1;
    req.body.project = mdr.projectId
    await DocumentPermssionModel.create(req?.body);
    return res.status(200).send({ message: "Document Permission Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.createComment = async (req, res) => {
  try {
    req.body.Resolved = 0
    const userId = req.body.userId
    const comments = await CommentsModel.create(req?.body);
    console.log('hi',comments);
    console.log('userId',userId);
    
    const user = await  UserModel.findOne({
      where:{
        id:userId[0],
      }
    })

    await SystemLogModel.create({
      typeOfLog: 20,

      departmentId:user.departmentId,
      title:`${user.firstName} just commented on ${comments.dataValues.docName}`,
      userId:user.id,
      companyId: user.companyId,
    });

    return res.status(200).send({ message: "Comment saved into DB" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.resolved = async (req, res) => {
  try {
    console.log(req.body);
    const { comments, docName,user ,userId} = req.body;
    const { id } = req.body.comments; // Extract the comment ID from req.body

    console.log("Comments:", comments);
    console.log("Document Name:", docName);
    console.log("Comment ID:", id);
    console.log(comments,docName,"information ai ha ",id);

      const updatedDocument = await CommentsModel.update({Resolved:true}, {
      
        where: {
          docName,
          [Op.and]: [
            sequelize.where(
              sequelize.fn('JSON_UNQUOTE', sequelize.fn('JSON_EXTRACT', sequelize.col('comments'), '$.id')),
              '=', 
              id
            )
          ]        
        }
      }
    )
        
    const userMe = await  UserModel.findOne({
      where:{
        id:user,
      }
    })

// console.log('helooo',updatedDocument);
    await SystemLogModel.create({
      typeOfLog: 21,

      title: `${userMe.firstName} resolved  a comment on ${docName}`,
      companyId: userMe.companyId,
      departmentId: userMe.departmentId,
      userId:userMe.id
    });

    console.log('SystemLogModelSystemLogModel');
    
    return res.status(200).send({ message: "Comment reply sent" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.uploadComment = async (req, res) => {
  try {
    console.log(req.body);
    const { comments, docName,user ,userId} = req.body;
    const { id } = req.body.comments; // Extract the comment ID from req.body

    console.log("Comments:", comments);
    console.log("Document Name:", docName);
    console.log("Comment ID:", id);
    console.log(comments,docName,"information ai ha ",id);
    // const log = `${req?.body?.userName} replied to comment ${req?.body?.title}`;
    // const body = omit(req.body, ["roleId", "userId", "userName"]);
    // const status='Uploaded';
    // Update document if it exists, otherwise create a new one

    if(user == "1"){
      const updatedDocument = await CommentsModel.update({Approved:true}, {
      
        where: {
          docName,
          // Construct condition to match specific 'id' within 'comments' JSON object
          [Op.and]: [
            sequelize.where(
              sequelize.fn('JSON_UNQUOTE', sequelize.fn('JSON_EXTRACT', sequelize.col('comments'), '$.id')),
              '=', 
              id
            )
          ]        }
      }
    )
    }
    else{
      const updatedDocument = await CommentsModel.update({comments}, {
      
        where: {
          docName,
          // Construct condition to match specific 'id' within 'comments' JSON object
          [Op.and]: [
            sequelize.where(
              sequelize.fn('JSON_UNQUOTE', sequelize.fn('JSON_EXTRACT', sequelize.col('comments'), '$.id')),
              '=', 
              id
            )
          ]        }
      }
    )
    }

        
    const userMe = await  UserModel.findOne({
      where:{
        id:user,
      }
    })

// console.log('helooo',updatedDocument);
    await SystemLogModel.create({
      typeOfLog: 22,

      title: `${userMe.firstName} replied to a comment on ${docName}`,
      companyId: userMe.companyId,
      departmentId: userMe.departmentId,
      userId:userMe.id
    });

    return res.status(200).send({ message: "Comment reply sent" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};



module.exports.exportComments = async (req, res) => {
  try {
    console.log("Request received");
    console.log(req?.query?.docName, req.query.version, "data");

    const comments = await CommentsModel.findAll({
      where: {
        docName: req?.query?.docName ? `${req.query.docName}.pdf` : null,
        version: req.query.version
      }
    });

    // Convert Sequelize objects and their nested objects to plain JSON
    const commentsJson = comments.map(comment => {
      const plainComment = comment.toJSON();

      // Remove specific keys from the nested objects
      if (plainComment.comments && plainComment.comments.position) {
        delete plainComment.comments.position.boundingRect;
        delete plainComment.comments.position.rects;
      }
      if (plainComment.comments) {
        delete plainComment.comments.content;
      }

      console.log(plainComment, 'plainComment');
      return plainComment;
    });

    // Expand the nested objects into the top-level objects and remove specific keys
    const expandedComments = commentsJson.map(obj => {
      const { comments, ...rest } = obj; // Destructure comments from obj

      return {
        ...rest, // Spread rest of the object properties
        ...comments, // Spread comments object properties
        // Spread comment object properties directly into the object
        ...comments.comment,
        // Spread position object properties directly into the object
        ...comments.position
      };
    }).map(obj => {
      // Remove comments.comment and comments.position from the object
      delete obj.comment;
      delete obj.position;
      return obj;
    });

    console.log(expandedComments, 'expandedComments');
    return res.status(200).json(expandedComments); // Ensure JSON response
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message }); // Ensure JSON error response
  }
};






module.exports.listComments = async (req, res) => {
  try {
    const comments = await CommentsModel.findAll({
      where: { docName: req?.query?.docName },
    });
    console.log(comments,"comments");

    let commentsObject;

if (req.query.user == "1") {

      commentsObject = comments
          .filter(comment => comment.Inhouse == 0 && comment.Approved == 0)
          .map(comment => {
              comment.comments.version = comment.version;
              comment.comments.Inhouse = comment.Inhouse;

              return comment.comments;
          });
  } else {
      commentsObject = comments
          .filter(comment => comment.Resolved == 0)
          .map(comment => {
              comment.comments.version = comment.version;
              comment.comments.Inhouse = comment.Inhouse;

              return comment.comments;
          });
  }
  


    return res.status(200).send(commentsObject);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listPermission = async (req, res) => {
  try {
    const data = await DocumentPermssionModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    const resData = [];
    for (const item of data) {
      resData.push({
        project:item?.project,
        id: item?.id,
        userId: item?.userId,
        masterDocumentId: item?.masterDocumentId,
        allowReview: item?.reviewDocument ? "Yes" : "No",
        allowApprove: item?.approveDocument ? "Yes" : "No",
        allowCreate: item?.createDocument ? "Yes" : "No",
      });
    }
    return res.status(200).send(resData);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateDocumentFormat = async (req, res) => {
  try {
    const { body } = req;

    const [rowsAffected] = await CompanyModel.update(body, {
      where: { id: req?.query?.companyId },
    });
    res.status(200).send({ message: "Document Format Updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.addingDoc = async (req, res) => {
  try {
    const body = req.body
    const count = req.body.count;

    
    const mdr = await MDRModel.findOne({
      where:{
        mdrCode:body.masterDocumentCode,
        projectCode:body.projectCode,
        companyId:body.companyId,
      }
    })

    const findDoc = await DocumentModel.findOne({
      where:{
        masterDocumentId:body.masterDocumentCode,
        projectId:mdr.projectId,
        companyId:body.companyId,
      }
    })
    const findEstablishment = await EstablishmentModel.findOne({
      where:{
        masterDocumentName:body.masterDocumentCode,
        masterDocumentCode:body.masterDocumentCode,
        docDepartmentId:findDoc.departmentId,
        companyId:body.companyId,
      }
    })
    
      const app =  findEstablishment.approver
      console.log(app,'appHain ye');
      
      const appName = app.split(",")
      console.log(appName,'appHain ye');

      const rev =  findEstablishment.reviewer
      const revName = rev.split(",")
      const approverComment = Array.from({ length: appName.length }).map(() => '').join(', ');
      const reviewerComment  = Array.from({ length: revName.length }).map(() => '').join(', ');
      const approverStatus = Array.from({ length: appName.length }).map(() => 0).join(', ');
      const reviewerStatus = Array.from({ length: revName.length }).map(() => 0).join(', ');

if(count){
  for (let item = 1; item <= count; item++) {
    const document = await DocumentModel.create({
      title:`${body.projectCode}-${body.areaCode}-${body.deptSuffix}-${body.docType}-00${item}`,
      docTitle:`${body.title}-${item}`,
      companyId:body.companyId,
      masterDocumentId:body.masterDocumentCode,
      departmentId:findDoc.departmentId,
      projectId:mdr.projectId,
      status:"Initialized",
      version:"000"
    })

  
    const establishing = await EstablishmentModel.create({
      docName:`${body.projectCode}-${body.areaCode}-${body.deptSuffix}-${body.docType}-00${item}`,
      userName:body.userName,
      companyId:body.companyId,
      masterDocumentName:body.masterDocumentCode,
      masterDocumentCode:body.masterDocumentCode,
      docDepartmentId:findDoc.departmentId,
      projectId:mdr.projectId,
      reviewer:findEstablishment.reviewer,
      approver:findEstablishment.approver,
      approverId:findEstablishment.approverId,
      reviewerId:findEstablishment.reviewerId,
      reviewerStatus,
      approverStatus,
      approverComment,
      reviewerComment,
      status:"Initialized",
      version:"000"
    })
  }
}else{
  const document = await DocumentModel.create({
    title:`${body.projectCode}-${body.areaCode}-${body.deptSuffix}-${body.docType}-001`,
    docTitle:body.title,
    companyId:body.companyId,
    masterDocumentId:body.masterDocumentCode,
    departmentId:findDoc.departmentId,
    projectId:mdr.projectId,
    status:"Initialized",
    version:"000"
  })


  const establishing = await EstablishmentModel.create({
    docName:`${body.projectCode}-${body.areaCode}-${body.deptSuffix}-${body.docType}-001`,
    userName:body.userName,
    companyId:body.companyId,
    masterDocumentName:body.masterDocumentCode,
    masterDocumentCode:body.masterDocumentCode,
    docDepartmentId:findDoc.departmentId,
    projectId:mdr.projectId,
    reviewer:findEstablishment.reviewer,
    approver:findEstablishment.approver,
    approverId:findEstablishment.approverId,
    reviewerId:findEstablishment.reviewerId,
    reviewerStatus,
    approverStatus,
    approverComment,
    reviewerComment,
    status:"Initialized",
    version:"000"
  })
}
    


    // const [rowsAffected] = await CompanyModel.update(body, {
    //   where: { id: req?.query?.companyId },
    // });

    res.status(200).send({ message: "Document Added Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.getDocumentFormat = async (req, res) => {
  try {
    const  companyId  = req.query.companyId;

    const companyformat = await CompanyModel.findOne({
      where: { id: req?.query?.companyId },
    });
    if (companyformat) {
      const { documentNumberFormat,name } = companyformat.dataValues;
      res.status(200).send({ documentNumberFormat,name });
    } 
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.getCodes = async (req, res) => {
  try {
    const company= await CompanyModel.findOne({
      where:{ id: req?.query?.companyId },
    })
    const DepartmentCode = await DepartmentModel.findAll({
      where:{ companyId: req?.query?.companyId },
    })
    const ProjectCode = await ProjectModel.findAll({
      where:{ companyId: req?.query?.companyId },
    })

    if (company) {
      const { documentNumberFormat } = company.dataValues;
      res.status(200).send({ documentNumberFormat });
    }     
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.exportMDRCsv = async (req, res) => {
  try {
    const company = await CompanyModel.findOne({
      where: { id: req?.query?.companyId },
    });
    const data = await MDRModel.findOne({
      where: { id: req?.params?.id },
      raw: true,
    });

    const format = company?.documentNumberFormat;
    const orderedProperties = format.split("-");
    const noOfDocuments = data?.noOfDocuments;

    const outputDocuments = [];
    for (i = 1; i <= noOfDocuments; i = i + 1) {
      let formatedName = "";
      for (const [index, item] of orderedProperties?.entries()) {
        console.log(item);
        if (item == "docNumber") {
          formatedName += i;
        } else {
          formatedName += data[item];
        }

        if (index + 1 != orderedProperties?.length) {
          formatedName += "-";
        }
      }
      outputDocuments.push(formatedName);
    }

    // Convert array to CSV
    const csv = Papa.unparse(outputDocuments.map((item) => [item]));

    // Write CSV content to a file
    fs.writeFileSync(
      `${data?.departmentName}-${data?.projectCode}-${data?.mdrCode}.csv`,
      csv,
      "utf-8"
    );

    console.log(outputDocuments, data, data["mdrCode"], csv);

    res.status(200).send({
      message: `CSV Exported as ${data?.departmentName}-${data?.projectCode}-${data?.mdrCode}`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
function incrementVersion(currentVersion, minor = true) {
  // Split the version into major and minor parts
  let [major, minorPart] = currentVersion.split('.');

  // Convert to numbers for incrementing
  major = parseInt(major);
  minorPart = minorPart ? parseInt(minorPart) : 0;

  // Increment the version based on minor or major condition
  if (minor) {
      minorPart++;
  } else {
      major++;
  }

  // Format the version back to XXX or XXX.X
  if (minorPart > 0) {
      return `${major.toString().padStart(3, '0')}.${minorPart.toString().padStart(1, '0')}`;
  } else {
      return major.toString().padStart(3, '0');
  }
}



module.exports.gettingEstablishment = async (req, res) => {
  try {
    const establishment = await EstablishmentModel.findAll({
      where: { companyId: req?.body?.companyId, 
      },
    });
    res.status(200).send(establishment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};