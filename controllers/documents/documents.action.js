// const db = require("../../models/index");
// const DocumentModel = db.documents;
// const CommentsModel = db.comments;
// const EstablishmentModel = db.establishments;

// const DepartmentModel = db.departments;
// const ProjectModel = db.projects;

// const MDRModel = db.master_document_registers;
// const DocumentPermssionModel = db.user_document_permissions;
// const SystemLogModel = db.system_logs;
// const CompanyModel = db.company;
// const { createPDF } = require("../../helpers/create-pdf");
// const { createWordFile } = require("../../helpers/create-docx");
// const path = require("path");
// const { omit } = require("lodash");
// const express = require('express');
// const router = express.Router();
// const json2csv = require('json2csv').parse;
// const sequelize = require("sequelize")
// const fs = require("fs");
// const Papa = require("papaparse");
// const { Sequelize, where } = require('sequelize');
// const { Op } = require('sequelize');
// const { reverse } = require("dns/promises");
// const { version } = require("os");
// const { title } = require("process");

// module.exports.listDocuments = async (req, res) => {
//   console.log("documents bhejoo");
//   console.log(req.query.assignedBy,req.query.userId,"assigned");
//   try {
//     const companyId = parseInt(req?.query?.companyId);
//     const departmentId = req?.query?.department;
//     const assignedTo = req?.query?.userId;
//     const assignedBy = req?.query?.assignedBy;

//     console.log(companyId,departmentId,assignedBy,assignedTo,'information');
//     console.log('hello');
//     // console.log('tttt',req.query);
//     // console.log('hi',typeof(companyId),req.query.masterDocumentId,req.query.projectId);
//     if(req.query.masterDocumentId){
//       const documents = await DocumentModel.findAll({
//         where: {
//           companyId: companyId,masterDocumentId:req.query.masterDocumentId,projectId:req.query.projectId
//         }
//       });
//       console.log('1',documents);

//       return res.status(200).send(documents);
//     }

//     else{
//       if(assignedTo=='1' || assignedBy=='1'){
//         const documents = await DocumentModel.findAll({
//         where: {
//           companyId: companyId,
//         }
//       });
//       console.log('2',documents);

//       return res.status(200).send(documents);
//     }
//     else{
//         const documents = await DocumentModel.findAll({
//           where: {
//             companyId: companyId,
//             departmentId: {
//               [Sequelize.Op.like]: `%${departmentId}%` // Using Sequelize operator for LIKE clause
//             },
            
//             [Op.or]: [
//               {
//                 assignedBy: {
//                   [Op.gte]: assignedBy // Matches or greater than assignedBy from query param
//                 }},
//                { assignedFrom: assignedTo // Matches assignedTo from query param
//               },
//               {
//                 assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
//               }
//             ]
            
            
//           }
          
//         });
//         console.log('3',documents);
//         return res.status(200).send(documents);
//     }
  
//   }
//   } catch (err) {
//     console.log('error',err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// // module.exports.listMDR = async (req, res) => {
// //   try {
// //     const mdr = await MDRModel.findAll({
// //       where: { companyId: req?.query?.companyId },
// //     });

// //     console.log(mdr,"mdr");
// //     const projectIds = mdr.map(project => project.dataValues.projectId);

// //     console.log(projectIds,"projectIds hain ");
    
// // // // Calculate document progress for each project
// // const documentProgress = projectIds.map(async projectId => {
// // // Fetch total counts of documents for the project
// // const totalDocuments = await DocumentModel.count({
// // where: { projectId }
// // });

// // console.log(documentProgress,"totalDocuments");

// // // Fetch counts of completed documents for the project
// // const completedDocuments = await DocumentModel.count({
// // where: { projectId, status: 'Completed' }
// // });
// // console.log(completedDocuments,"completedDocuments");

// // // Calculate percentage of completed documents
// // const percentage = (completedDocuments / totalDocuments) * 100;

// // return { projectId, percentage };
// // });

// // // // // Await all document progress calculations to complete
// // const documentProgressResults = await Promise.all(documentProgress);

// // console.log(documentProgressResults,'results aye ');
// // const combinedData = results.map(result => {
// //   const mdrEntry = mdr.find(entry => entry.id === result.projectId);
// //   return { ...result, ...mdrEntry };
// // });

// // console.log(combinedData);



// //     return res.status(200).send(mdr);
// //   } catch (err) {
// //     console.log(err.message);
// //     res.status(500).send({ message: err.message });
// //   }
// // };


// module.exports.listMDR = async (req, res) => {
//   try {
//     const mdr = await MDRModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });

//     console.log(mdr, "mdr");

//     // Extract project IDs from MDR data
//     const projectIds = mdr.map(project => project.dataValues.projectId);

//     console.log(projectIds, "projectIds");

//     // Calculate document progress for each project
//     const documentProgress = await Promise.all(projectIds.map(async projectId => {
//       // Fetch total counts of documents for the project
//       const totalDocuments = await DocumentModel.count({ where: { projectId } });
//       console.log(totalDocuments, "totalDocuments");

//       // Fetch counts of completed documents for the project
//       const completedDocuments = await DocumentModel.count({ where: { projectId, status: 'Completed' } });
//       console.log(completedDocuments, "completedDocuments");

//       // Calculate percentage of completed documents
//       const percentage = totalDocuments === 0 ? 0 : (completedDocuments / totalDocuments) * 100;

//       return { projectId, percentage };
//     }));

//     console.log(documentProgress, 'documentProgressResults');

//     // Combine document progress with MDR data
//     const combinedData = mdr.map(entry => {
//       const progressEntry = documentProgress.find(progress => progress.projectId === entry.projectId);
//       return { ...entry.dataValues, ...progressEntry };
//     });

//     console.log(combinedData, 'combinedData');

//     return res.status(200).send(combinedData);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };



// // module.exports.listProjects = async (req, res) => {
// //   try {
    
// //     const projects = await ProjectModel.findAll({
// //       where: { companyId: req?.query?.companyId },
// //     });
// //     const departmentIds = projects.map(project => project.dataValues.departmentId);

// // console.log(departmentIds);
// // const departments = await DepartmentModel.findAll({
// //   where: {
// //     id: departmentIds
// //   }
// // });
// // const departmentNames = departments.map(department => (department.dataValues.id,department.dataValues.title));
// // const departmentMap = {};
// // departments.forEach(department => {
// //   departmentMap[department.dataValues.id] = department.dataValues.title;
// // });
// // console.log(departmentMap);
// // console.log(departmentNames);


// // const projectIds = projects.map(project => project.dataValues.id);

// // // Calculate document progress for each project
// // const documentProgress = projectIds.map(async projectId => {
// // // Fetch total counts of documents for the project
// // const totalDocuments = await DocumentModel.count({
// // where: { projectId }
// // });

// // console.log(documentProgress,"totalDocuments");

// // // Fetch counts of completed documents for the project
// // const completedDocuments = await DocumentModel.count({
// // where: { projectId, status: 'Completed' }
// // });
// // console.log(completedDocuments,"completedDocuments");

// // // Calculate percentage of completed documents
// // const percentage = (completedDocuments / totalDocuments) * 100;

// // return { projectId, percentage };
// // });

// // // Await all document progress calculations to complete
// // const documentProgressResults = await Promise.all(documentProgress);

// // console.log(documentProgressResults,'results aye ');


// // const combinedData = projects.map(project => {
// //   const departmentName = departmentMap[project.dataValues.departmentId];
// //   return {
// //     ...project.dataValues,
// //     departmentName: departmentName || 'Unknown' // Handle cases where departmentName is not found
// //   };
// // });

// // const combinedDataWithPercentage = combinedData.map(item => {
// //   const percentageObj = documentProgressResults.find(p => p.projectId === item.id);
// //   return {
// //     ...item,
// //     percentage: percentageObj ? percentageObj.percentage : 0
// //   };
// // });
// // console.log(combinedDataWithPercentage,"combinedData");
// // console.log(combinedData);
// //     return res.status(200).send(combinedDataWithPercentage);
// //   } catch (err) {
// //     console.log(err.message);
// //     res.status(500).send({ message: err.message });
// //   }
// // };

// module.exports.createMDR = async (req, res) => {
//   try {
//     console.log(req.body);

//     const id = req.body.projectId
//     const fetchProject = await ProjectModel.findOne({where:{id}})
//     console.log(fetchProject,id,"hurrah");
//     req.body.departmentId = fetchProject.departmentIds
//     req.body.departmentName = fetchProject.departmentTitle
//     const mdr = await MDRModel.create(req?.body);
//     console.log(mdr);
//     await SystemLogModel.create({
//       title: `${req?.body?.authorName} Created MDR ${req?.body?.title}`,
//       companyId: req?.body?.companyId,
//     });
//     return res.status(200).send({ message: "Master Document Register Assigned" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };
// module.exports.createDocument = async (req, res) => {
//   try {
//     console.log("working");
    
//     // if (req?.body?.roleId != 1) {
//     //   const permissionExist = await DocumentPermssionModel.findOne({
//     //     where: {
//     //       masterDocumentId: req?.body?.masterDocumentId,
//     //       userId: req?.body?.userId,
//     //       companyId: req?.body?.companyId,
//     //       createDocument: 1,
//     //     },
//     //   });
//     //   if (!permissionExist) {
//     //     return res.status(403).send({ message: "Permission denied" });
//     //   }
//     // }
//     const docTitle = req.body.docTitle

//     const projectCode = req.query.projectCode;
//     const areaCode = req.query.areaCode;
//     const deptSuffix = req.query.deptSuffix;

//     const projectId = req.body.projectId
//     console.log(projectId,"Id Check ");

//     const projectDepartments =await ProjectModel.findOne({where:{id:projectId}})
//     console.log(projectDepartments,'Departments bhi ha');
//     req.body.departmentId = projectDepartments.departmentIds

//     console.log(req.body,"ye body ha ab");

//     const count = await DocumentModel.count({
//       where: {
//         masterDocumentId: req.body.masterDocumentId
//       }
//     });
//     console.log("approvers",req.body.approver);
//     const appName=JSON.parse(req.body.approver);

//     const revName=JSON.parse(req.body.reviewer);

//     console.log('my approver names',appName);
//   console.log(count);

//     let docNumber = `${count+1}`
    
//     // req.body.title = `${projectCode}-${areaCode}-${deptSuffix}-${docNumber}`
//     const log = `${req?.body?.userName} Created Document ${req?.body?.title}`;
//     console.log("mybody ",req.body);
//     const body = omit(req.body, ["roleId", "userId", "userName"]);
//     console.log("body",body)

//     const document = await DocumentModel.create(body);

//     console.log('created',document);

//       req.body.docName=req.body.title;
//       req.body.docDepartmentId=req.body.departmentId;
//       req.body.docDepartmentName=req.body.departmentName;
//       req.body.masterDocumentCode=req.body.masterDocumentId;
//       req.body.masterDocumentName=req.body.masterDocumentId;
//       req.body.approverId = appName.map(approver => approver.id).join(', ');
//       req.body.reviewerId = revName.map(reviewer => reviewer.id).join(', ');
//       req.body.approver = appName.map(approver => approver.name).join(', ');
//       req.body.reviewer = revName.map(reviewer => reviewer.name).join(', ');
//       req.body.approverComment = Array.from({ length: appName.length }).map(() => '').join(', ');
//       req.body.reviewerComment  = Array.from({ length: revName.length }).map(() => '').join(', ');
//       req.body.approverStatus = Array.from({ length: appName.length }).map(() => 0).join(', ');
//       req.body.reviewerStatus = Array.from({ length: revName.length }).map(() => 0).join(', ');
//        req.body.status=null;
//       const establishments = await EstablishmentModel.create(req.body);
//       console.log(establishments);

     
// //      for(let i of revName){
// //       console.log(revName);
// //       console.log(i,i.name,i['name']);
// //       const userName= i.name
// //       const designation=false;
// //        const status=false;

// //       req.body.docName=req.body.title;
// //       req.body.docDepartmentId=req.body.departmentId;
// //       req.body.docDepartmentName=req.body.departmentName;
// //       req.body.masterDocumentCode=req.body.masterDocumentId;
// //       req.body.masterDocumentName=req.body.masterDocumentId;
// //       req.body.userName=userName; 
// //       req.body.designation=designation; 
// //        req.body.status=status;
// //       const establishments = await EstablishmentModel.create(req.body);
// // console.log(establishments);

//     //  }
//     await SystemLogModel.create({
//       title: log,
//       companyId: req?.body?.companyId,
//     });
//     // if(req.body.status==)
//     // const filePath = path.join(
//     //   __dirname,
//     //   "..",
//     //   "..",
//     //   "uploads",
//     //   `${req?.body?.title}${req?.body?.extension}`
//     // );
//     // if (req?.body?.extension == ".pdf") {
//     //   await createPDF(req?.body?.content, filePath);
//     // }
//     // if (req?.body?.extension == ".docx") {
//     //   await createWordFile(req?.body?.content, filePath);
//     // }
//     return res.status(200).send({ message: "Document Created" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };
// module.exports.assignDoc = async (req, res) => {
//   try {
//     const title= req?.query?.docName ;
//     const assignedTo=req?.query?.assignedTo ;
//     console.log(assignedTo,"assigned Employees");
//     const assignedBy=req?.query?.assignedBy ;
//     const assignedFrom=req?.query?.assignedFrom ;

//     console.log(req.body);

//     updatedDocs = await DocumentModel.update(
//       { assignedTo: assignedTo, assignedBy: assignedBy,assignedFrom: assignedFrom },
//       { where: { title: title } }
//     );
//     // await SystemLogModel.update({
//     //   title: `${req?.body?.authorName} Created MDR ${req?.body?.title}`,
//     //   companyId: req?.body?.companyId,
//     // });
//     return res.status(200).send({ message: "Document Assigned" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.updateMDR = async (req, res) => {
//   try {
//     const id = req.body.projectId
   
//     const recordData = JSON.parse(req.body.record);
//     console.log(recordData,"recordData");
//     const { projectId, projectCode,mdrCode } = recordData;

//     const fetchProject = await ProjectModel.findOne({where:{id:projectId}})
//     req.body.departmentId = fetchProject.departmentIds
//     req.body.departmentName = fetchProject.departmentTitle

//     console.log("projectId:", projectId);
//     console.log("projectCode:", projectCode);

//     delete req.body.record;
//     const update = await MDRModel.update(req.body, {
//       where: { projectId, projectCode,mdrCode },
//     });


//     return res.status(200).send({ message: "MDR Updated" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.exportDoc=async (req,res)=>{
//   try {
//     const data = req.body.data;
//     const csv = convertToCSV(data); // Assuming convertToCSV is a function that converts data to CSV format
//     res.header('Content-Type', 'text/csv');
//     res.attachment('export.csv');
//     res.send(csv);
// } catch (error) {
//     console.error('Error exporting CSV:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
// }
// }

// module.exports.uploadDoc = async (req, res) => {
//   try {
//     const title = req.body.title;
//     console.log(req.body,'chal');
//     const log = `${req?.body?.userName} Uploaded Document ${req?.body?.title}`;
//     // const body = omit(req.body, ["roleId", "userId", "userName"]);
// const status='Uploaded';

//     // Update document if it exists, otherwise create a new one
//     const updatedDocument = await DocumentModel.update({status}, {
//       where: { title:  {
//         [Sequelize.Op.like]: `%${title}%`
//       }}
//     });

// console.log('helooo',updatedDocument);
//     await SystemLogModel.create({
//       title: log,
//       companyId: req?.body?.companyId,
//     });

//     return res.status(200).send({ message: "Document uploaded" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


// // module.exports.listEstablishment = async (req, res) => {

// //   const getLatestDocuments = (documentList) => {
// //     const groupedDocuments = {};

// //     // Group documents by docName
// //     documentList.forEach((doc) => {
// //         if (!groupedDocuments[doc.docName]) {
// //             groupedDocuments[doc.docName] = [];
// //         }
// //         groupedDocuments[doc.docName].push(doc);
// //     });

// //     // Get the latest document for each docName based on version
// //     const latestDocuments = [];
// //     for (const docName in groupedDocuments) {
// //         const documents = groupedDocuments[docName];

// //         // Sort documents by version in ascending order
// //         documents.sort((a, b) => {
// //             if (a.version < b.version) return -1;
// //             if (a.version > b.version) return 1;
// //             return 0;
// //         });

// //         // Get the latest (highest version) document
// //         const latestDocument = documents[documents.length - 1];
// //         latestDocuments.push(latestDocument);
// //     }

// //     return latestDocuments;
// // };
// //   console.log(req.query.userId,"req.query.userId");
// //   if(req.query.roleId == 1){
// //     const establishment = await EstablishmentModel.findAll({
// //       where: { companyId: req?.query?.companyId, 
// //       },
     
// //     });
// //     const latestDocuments = getLatestDocuments(establishment);

// //     return res.status(200).send(latestDocuments);
// //   }

// //   if(req.query.docName){
// //     try {
// //       const establishment = await EstablishmentModel.findAll({
// //         where: { companyId: req?.query?.companyId, docName:req.query.docName,
// //           [Sequelize.Op.or]: [
// //             {
// //               approverId: {
// //                 [Sequelize.Op.like]: `%${req?.query?.userId}%`
// //               }
// //             },
// //             {
// //               reviewerId: {
// //                 [Sequelize.Op.like]: `%${req?.query?.userId}%`
// //               }
// //             }
// //           ]
// //         },
// //       });
// //       const latestDocuments = getLatestDocuments(establishment);

// //       return res.status(200).send(latestDocuments);
// //     } catch (err) {
// //       console.log('error',err.message);
// //       res.status(500).send({ message: err.message });
// //     } 
// //   }

// //   try {
// //   console.log("enter 1");
// //     const establishment = await EstablishmentModel.findAll({
// //       where: { companyId: req?.query?.companyId, 
// //         [Sequelize.Op.or]: [
// //           {
// //             approverId: {
// //               [Sequelize.Op.like]: `%${req?.query?.userId}%`
// //             }
// //           },
// //           {
// //             reviewerId: {
// //               [Sequelize.Op.like]: `%${req?.query?.userId}%`
// //             }
// //           }
// //         ]
// //       },
// //     });

    
  
// //   // Call the function with the sample documents array
// //   const latestDocuments = getLatestDocuments(establishment);
  
// //   // Output the latest documents
// //   console.log(latestDocuments,"latestones ");

// //     console.log(establishment,"establishment ai");
// //     return res.status(200).send(latestDocuments);
// //   } catch (err) {
// //     console.log('error',err.message);
// //     res.status(500).send({ message: err.message });
// //   }
// // };


// module.exports.listEstablishment = async (req, res) => {
//   //   const getLatestDocuments = (documentList) => {
//   //     const groupedDocuments = {};
//   //     // Group documents by docName
//   //     documentList.forEach((doc) => {
//   //         if (!groupedDocuments[doc.docName]) {
//   //             groupedDocuments[doc.docName] = [];
//   //         }
//   //         console.log(groupedDocuments[doc.docName],'docNameAya');
//   //         groupedDocuments[doc.docName].push(doc);
  
//   //     });
//   //     console.log(groupedDocuments,'documentss');
//   //     // Get the latest document for each docName based on version
//   //     const latestDocuments = [];
//   //     for (const docName in groupedDocuments) {
//   //         const documents = groupedDocuments[docName];
//   //         console.log(documents,'logging');
//   //         // Sort documents by version in ascending order
//   //         documents.sort((a, b) => {
//   //             if (a.version < b.version) return -1;
//   //             if (a.version > b.version) return 1;
//   //             return 0;
//   //         });
  
//   //         // Get the latest (highest version) document
//   //         const latestDocument = documents[documents.length - 1];
//   //         console.log(latestDocument,'latestDoc');
//   //         latestDocuments.push(latestDocument);
//   //     }
//   //     return latestDocuments;
//   // };
  
  
  
//     console.log(req.query.userId,"req.query.userId");
//     console.log(req.query.roleId,"req.query.roleId");
//     if(req.query.roleId == 1){
//       const establishment = await EstablishmentModel.findAll({
//         where: { companyId: req?.query?.companyId,},
//       });
  
  
      
//       const latestDocuments = establishment;
//       console.log(latestDocuments,"latests only");
//       return res.status(200).send(latestDocuments);
//     }
  
//     if(req.query.roleId == 6){
//       const establishment = await EstablishmentModel.findAll({
//         where: { companyId: req?.query?.companyId , sendToClient:true
//         },
       
//       });
//       console.log(establishment,'establishing');
//       const latestDocuments = establishment;
//       console.log(latestDocuments,'lateststabling');
//       return res.status(200).send(latestDocuments);
//     }
  
//     if(req.query.docName){
//       try {
//         const establishment = await EstablishmentModel.findAll({
//           where: { companyId: req?.query?.companyId, docName:req.query.docName,
//             [Sequelize.Op.or]: [
//               {
//                 approverId: {
//                   [Sequelize.Op.like]: `%${req?.query?.userId}%`
//                 }
//               },
//               {
//                 reviewerId: {
//                   [Sequelize.Op.like]: `%${req?.query?.userId}%`
//                 }
//               }
//             ]
//           },
//         });
//         const latestDocuments = (establishment);
  
//         return res.status(200).send(latestDocuments);
//       } catch (err) {
//         console.log('error',err.message);
//         res.status(500).send({ message: err.message });
//       } 
//     }
  
//     try {
//     console.log("enter 1");
//       const establishment = await EstablishmentModel.findAll({
//         where: { companyId: req?.query?.companyId, 
//           [Sequelize.Op.or]: [
//             {
//               approverId: {
//                 [Sequelize.Op.like]: `%${req?.query?.userId}%`
//               }
//             },
//             {
//               reviewerId: {
//                 [Sequelize.Op.like]: `%${req?.query?.userId}%`
//               }
//             }
//           ]
//         },
//       });
  
      
    
//     // Call the function with the sample documents array
//     const latestDocuments = (establishment);
    
//     // Output the latest documents
//     console.log(latestDocuments,"latestones ");
  
//       console.log(establishment,"establishment ai");
//       return res.status(200).send(latestDocuments);
//     } catch (err) {
//       console.log('error',err.message);
//       res.status(500).send({ message: err.message });
//     }
//   };
  

// module.exports.updateDocStatus = async (req, res) => {
//   try {
//     const versionIn = req.query.version
//     const userName = req.query.userName 
//     const approver = req.query.approver 
//     const reviewer = req.query.reviewer 
//     const approverId = req.query.approverId 
//     const reviewerId = req.query.reviewerId 
//     const companyId = req.query.companyId 
//     const masterDocumentCode = req.query.masterDocumentCode 
//     const masterDocumentName = req.query.masterDocumentName 
//     const docDepartmentId = req.query.docDepartmentId 

//     const role = req.query.yourRole 
//     const docName = req.body.docName;
//     const approverStatus=req.body.appStatusArr;
//     const reviewerStatus=req.body.revStatusArr;

//     function incrementVersion(versionIn) {
//       // Define the current version prefix and increment value
//       const currentPrefix = '000';
//       const incrementValue = '.1';
    
//       // Check if the incoming version starts with the current prefix and is exactly '000'
//       if (versionIn === currentPrefix) {
//         // If version is '000', increment it to '000.1'
//         return currentPrefix + incrementValue;
//       } else if (versionIn.startsWith(currentPrefix + '.')) {
//         // If version is in the form '000.x', increment the numeric part
//         const numericPart = versionIn.slice(currentPrefix.length + 1); // Extract the numeric part after '000.'
//         const incrementedNumeric = parseInt(numericPart) + 1; // Parse and increment the numeric part
//         return currentPrefix + '.' + incrementedNumeric.toString(); // Construct the updated version
//       } else {
//         // Return the original version if it does not match the expected format
//         return versionIn;
//       }
//     }
    
//     const updatedVersion = incrementVersion(versionIn);

//     appArray=approverStatus.split(',');
//     revArray=reviewerStatus.split(',');

//     const approverComment=req.body.approverComment;
//     const reviewerComment=req.body.reviewerComment;

//     if(approverComment || reviewerComment){
//       var appComment=approverComment.split(',');
//       var revComment=reviewerComment.split(',');
//     }



// let status='Uploaded';

// const document = await DocumentModel.findOne({where:{ title: docName }});
// let version = document ? document.version : null;

// if (revArray.every(num => num == 1) && appArray.every(num => num == 0)) {
//     status = 'Reviewers Rejected';
//     version = incrementVersion(version, true);
// } else if (appArray.every(num => num == 1) && revArray.every(num => num == 2)) {
//     status = 'Approvers Rejected';
//     version = incrementVersion(version, false);
// }
// else if(revArray.every(num => num == 2) &&appArray.every(num => num == 0))
// {
// status='Pending for Approval';
// // version='000';

// }

// else if(appArray.every(num => num == 2)&&revArray.every(num => num == 2))
// {
// status='Approved(in-house)';
// // version='000';

// }
// const updateDocStatus = await DocumentModel.update({status,version}, {
//   where: { title:  {
//     [Sequelize.Op.like]: `%${docName}%`
//   }}
// });
//     console.log(docName);

 


//     const updateCheck = await EstablishmentModel.findOne({
//       where: { docName: docName }
//     });
    
//     if (!updateCheck) {
//       return res.status(404).send({ message: "Document not found" });
//     }
    
//     // Check reviewerStatus for any '0'
//     if (updateCheck.reviewerStatus && updateCheck.reviewerStatus.includes('0') && role === "Approver") {
//       return res.status(200).send({ message: "Reviewer Status is not completed yet" });
//     }
    
//     // Update document with new status values
//     await EstablishmentModel.update(
//       { reviewerStatus,approverStatus, approverComment, reviewerComment },
//       { where: { docName: docName } }
//     );
    
//     // Retrieve updated document
//     const updatedDocument = await EstablishmentModel.findOne({
//       where: { docName: docName }
//     });
    
//     if (!updatedDocument) {
//       return res.status(404).send({ message: "Document not found after update" });
//     }
    
//     // Check if all reviewerStatus and approverStatus are '1'
//     const reviewerStatusParts = updatedDocument.reviewerStatus.split(',');
//     const approverStatusParts = updatedDocument.approverStatus.split(',');
    
//     const allReviewersApproved = reviewerStatusParts.every(part => part.trim() === '1');
//     const allApproversApproved = approverStatusParts.every(part => part.trim() === '1');
    
//     // If any status is not '1', request a new version
//     if (allReviewersApproved) {
// //       console.log(record, "record");
// //       console.log(record.reviewerId,record.approverId,'Ids');
// // Check if 'approverId' exists and is a string before splitting
//       const countApp = appArray.length || 0;

//       // Check if 'reviewerId' exists and is a string before splitting
//       const countRev = revArray.length || 0;

//       // Update 'approverComment' and 'reviewerComment' based on the count
//       const approverComment = Array.from({ length: countApp }).map(() => '').join(', ');
//       const reviewerComment = Array.from({ length: countRev }).map(() => '').join(', ');

//       // Update 'approverStatus' and 'reviewerStatus' based on the count
//       const approverStatuses = Array.from({ length: countApp }).map(() => 0).join(', ');
//       const reviewerStatuses = Array.from({ length: countRev }).map(() => 0).join(', ');
//       console.log(countApp,countRev,"counting");
//     const recordData = {
//       // Assign specific properties from 'record' to the new record
//       docName: docName,
//       userName: userName,
//       reviewer: reviewer,
//       approver: approver,
//       version:updatedVersion,
//       approverId,reviewerId,
//       approverStatus:approverStatuses,reviewerStatus:reviewerStatuses,approverComment,reviewerComment,companyId,docDepartmentId,masterDocumentCode,masterDocumentName
//     };
      
//       const newRecord = await EstablishmentModel.create(recordData)

//       return res.status(200).send({ message: "Please upload a new version now!" });
//     }
    
//     // If all statuses are '1', return success message
//     return res.status(200).send({ message: "Document Status updated" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.createPermission = async (req, res) => {
//   try {
//     if (req?.body?.createDocument) req.body.reviewDocument = 1;
//     await DocumentPermssionModel.create(req?.body);
//     return res.status(200).send({ message: "Document Permission Created" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };
// module.exports.createComment = async (req, res) => {
//   try {
//     console.log(req.body,"before");
//     console.log(req.body,"after"); 
//     req.body.Resolved = 0
//     const comments = await CommentsModel.create(req?.body);
//     console.log('hi',comments);
//     // await SystemLogModel.create({
//     //   title: `${req?.body?.authorName} Created MDR ${req?.body?.title}`,
//     //   companyId: req?.body?.companyId,
//     // });
//     return res.status(200).send({ message: "Comment saved into DB" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };
// module.exports.uploadComment = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { comments, docName,user } = req.body;
//     const { id } = req.body.comments; // Extract the comment ID from req.body

//     console.log("Comments:", comments);
//     console.log("Document Name:", docName);
//     console.log("Comment ID:", id);
//     console.log(comments,docName,"information ai ha ",id);
//     // const log = `${req?.body?.userName} replied to comment ${req?.body?.title}`;
//     // const body = omit(req.body, ["roleId", "userId", "userName"]);
//     // const status='Uploaded';
//     // Update document if it exists, otherwise create a new one

//     if(user == "1"){
//       const updatedDocument = await CommentsModel.update({Approved:true}, {
      
//         where: {
//           docName,
//           // Construct condition to match specific 'id' within 'comments' JSON object
//           [Op.and]: [
//             sequelize.where(
//               sequelize.fn('JSON_UNQUOTE', sequelize.fn('JSON_EXTRACT', sequelize.col('comments'), '$.id')),
//               '=', 
//               id
//             )
//           ]        }
//       }
//     )
//     }
//     else{
//       const updatedDocument = await CommentsModel.update({comments,Resolved:true}, {
      
//         where: {
//           docName,
//           // Construct condition to match specific 'id' within 'comments' JSON object
//           [Op.and]: [
//             sequelize.where(
//               sequelize.fn('JSON_UNQUOTE', sequelize.fn('JSON_EXTRACT', sequelize.col('comments'), '$.id')),
//               '=', 
//               id
//             )
//           ]        }
//       }
//     )
//     }

// // console.log('helooo',updatedDocument);
// //     await SystemLogModel.create({
// //       title: log,
// //       companyId: req?.body?.companyId,
// //     });

//     return res.status(200).send({ message: "Comment reply sent" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.listComments = async (req, res) => {
//   try {
//     const comments = await CommentsModel.findAll({
//       where: { docName: req?.query?.docName },
//     });
//     console.log(comments,"comments");
//     let commentsObject = []
//     if (req.query.user == "1") {
//     commentsObject = comments
//     .filter(comment => comment.Inhouse == 0 && comment.Approved == 0)    
//     .map(comment => comment.comments) // Extract the 'comments' array from each comment object
//   // Filter comments where 'Inhouse' status is 0

//     }
//     else{
//       commentsObject = comments
//       .filter(comment => comment.Resolved == 0)
//       .map(comment => comment.comments)    
//     }

//     return res.status(200).send(commentsObject);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.listPermission = async (req, res) => {
//   try {
//     const data = await DocumentPermssionModel.findAll({
//       where: { companyId: req?.query?.companyId },
//     });
//     const resData = [];
//     for (const item of data) {
//       resData.push({
//         id: item?.id,
//         userId: item?.userId,
//         masterDocumentId: item?.masterDocumentId,
//         allowReview: item?.reviewDocument ? "Yes" : "No",
//         allowApprove: item?.approveDocument ? "Yes" : "No",
//         allowCreate: item?.createDocument ? "Yes" : "No",
//       });
//     }
//     return res.status(200).send(resData);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.updateDocumentFormat = async (req, res) => {
//   try {
//     const { body } = req;

//     const [rowsAffected] = await CompanyModel.update(body, {
//       where: { id: req?.query?.companyId },
//     });
//     res.status(200).send({ message: "Document Format Updated" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.getDocumentFormat = async (req, res) => {
//   try {
//     const  companyId  = req.query.companyId;

//     const companyformat = await CompanyModel.findOne({
//       where: { id: req?.query?.companyId },
//     });
//     if (companyformat) {
//       const { documentNumberFormat,name } = companyformat.dataValues;
//       res.status(200).send({ documentNumberFormat,name });
//     } 
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.getCodes = async (req, res) => {
//   try {
//     const company= await CompanyModel.findOne({
//       where:{ id: req?.query?.companyId },
//     })
//     const DepartmentCode = await DepartmentModel.findAll({
//       where:{ companyId: req?.query?.companyId },
//     })
//     const ProjectCode = await ProjectModel.findAll({
//       where:{ companyId: req?.query?.companyId },
//     })

//     if (company) {
//       const { documentNumberFormat } = company.dataValues;
//       res.status(200).send({ documentNumberFormat });
//     }     
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


// module.exports.exportMDRCsv = async (req, res) => {
//   try {
//     const company = await CompanyModel.findOne({
//       where: { id: req?.query?.companyId },
//     });
//     const data = await MDRModel.findOne({
//       where: { id: req?.params?.id },
//       raw: true,
//     });

//     const format = company?.documentNumberFormat;
//     const orderedProperties = format.split("-");
//     const noOfDocuments = data?.noOfDocuments;

//     const outputDocuments = [];
//     for (i = 1; i <= noOfDocuments; i = i + 1) {
//       let formatedName = "";
//       for (const [index, item] of orderedProperties?.entries()) {
//         console.log(item);
//         if (item == "docNumber") {
//           formatedName += i;
//         } else {
//           formatedName += data[item];
//         }

//         if (index + 1 != orderedProperties?.length) {
//           formatedName += "-";
//         }
//       }
//       outputDocuments.push(formatedName);
//     }

//     // Convert array to CSV
//     const csv = Papa.unparse(outputDocuments.map((item) => [item]));

//     // Write CSV content to a file
//     fs.writeFileSync(
//       `${data?.departmentName}-${data?.projectCode}-${data?.mdrCode}.csv`,
//       csv,
//       "utf-8"
//     );

//     console.log(outputDocuments, data, data["mdrCode"], csv);

//     res.status(200).send({
//       message: `CSV Exported as ${data?.departmentName}-${data?.projectCode}-${data?.mdrCode}`,
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };
// function incrementVersion(currentVersion, minor = true) {
//   // Split the version into major and minor parts
//   let [major, minorPart] = currentVersion.split('.');

//   // Convert to numbers for incrementing
//   major = parseInt(major);
//   minorPart = minorPart ? parseInt(minorPart) : 0;

//   // Increment the version based on minor or major condition
//   if (minor) {
//       minorPart++;
//   } else {
//       major++;
//   }

//   // Format the version back to XXX or XXX.X
//   if (minorPart > 0) {
//       return `${major.toString().padStart(3, '0')}.${minorPart.toString().padStart(1, '0')}`;
//   } else {
//       return major.toString().padStart(3, '0');
//   }
// }

// module.exports.exportComments = async (req, res) => {
//   try {
//     console.log("Request received");
//     console.log(req?.query?.docName, req.query.version, "data");

//     const comments = await CommentsModel.findAll({
//       where: {
//         docName: req?.query?.docName ? `${req.query.docName}.pdf` : null,
//         version: req.query.version
//       }
//     });

//     // Convert Sequelize objects and their nested objects to plain JSON
//     const commentsJson = comments.map(comment => {
//       const plainComment = comment.toJSON();

//       // Remove specific keys from the nested objects
//       if (plainComment.comments && plainComment.comments.position) {
//         delete plainComment.comments.position.boundingRect;
//         delete plainComment.comments.position.rects;
//       }
//       if (plainComment.comments) {
//         delete plainComment.comments.content;
//       }

//       console.log(plainComment, 'plainComment');
//       return plainComment;
//     });

//     // Expand the nested objects into the top-level objects and remove specific keys
//     const expandedComments = commentsJson.map(obj => {
//       const { comments, ...rest } = obj; // Destructure comments from obj

//       return {
//         ...rest, // Spread rest of the object properties
//         ...comments, // Spread comments object properties
//         // Spread comment object properties directly into the object
//         ...comments.comment,
//         // Spread position object properties directly into the object
//         ...comments.position
//       };
//     }).map(obj => {
//       // Remove comments.comment and comments.position from the object
//       delete obj.comment;
//       delete obj.position;
//       return obj;
//     });

//     console.log(expandedComments, 'expandedComments');
//     return res.status(200).json(expandedComments); // Ensure JSON response
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ message: err.message }); // Ensure JSON error response
//   }
// };

// module.exports.Accept = async (req, res) => {
//   console.log("yaha aa");
//   try {
//     const docName = req.body.docName;
//     const approverStatus=req.body.appStatusArr;
//     const reviewerStatus=req.body.revStatusArr;
//     console.log(reviewerStatus,approverStatus,'status');
//     const versionIn= req.query.version;
  
//     appArray=approverStatus.split(',');
//     revArray=reviewerStatus.split(',');

// const document = await DocumentModel.findOne({where:{ title: docName }});
// let version = document ? document.version : null;
// let status = 'Uploaded'
// if (revArray.every(num => num == 1) && appArray.every(num => num == 0)) {
//     status = 'Reviewers Rejected';
// } else if (appArray.every(num => num == 1) && revArray.every(num => num == 2)) {
//     status = 'Approvers Rejected';
// }
// else if(revArray.every(num => num == 2) &&appArray.every(num => num == 0))
// {
// status='Pending for Approval';
// }

// else if(appArray.every(num => num == 2)&&revArray.every(num => num == 2))
// {
// status='Approved(in-house)';
// }
// const updateDocStatus = await DocumentModel.update({status,version}, {
//   where: { title:  {
//     [Sequelize.Op.like]: `%${docName}%`
//   }}
// });

//     const updateCheck = await EstablishmentModel.findOne({
//       where: { docName: docName }
//     });
    
//     if (!updateCheck) {
//       return res.status(404).send({ message: "Document not found" });
//     }
    
//     // // Check reviewerStatus for any '0'
//     // if (updateCheck.reviewerStatus && updateCheck.reviewerStatus.includes('0') && role === "Approver") {
//     //   return res.status(200).send({ message: "Reviewer Status is not completed yet" });
//     // }
    
//     // Update document with new status values
//     await EstablishmentModel.update(
//       { reviewerStatus,approverStatus },
//       { where: { docName: docName , version:versionIn } }
//     );
        
//     return res.status(200).send({ message: "Document Status updated" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };
// // module.exports.updateReview = async (req, res) => {
// //   try {
// //     const body = req.body
// //     const status = body.clientStatus
// //     const commnent = body.clientComment
// //     const version = body.version
// //     const docName = body.docName
// //     const app = req.body.app
// //     const rev = req.body.rev
// //     const myrecord = req.body.myrecord

// //     console.log(body,status,commnent,version,docName);
// //     console.log(app,rev,"yreocr",myrecord)
// //     function incrementVersion(versionIn) {
// //       // Split the version string at the first period ('.')
// //       const parts = versionIn.split('.');
    
// //       // Extract the prefix and validate it
// //       const prefix = parts[0];
    
// //       if (/^\d{3}$/.test(prefix)) {
// //         // Increment the prefix
// //         const incrementedPrefix = (parseInt(prefix) + 1).toString().padStart(3, '0');
// //         return incrementedPrefix;
// //       } else {
// //         // Return the original version if it does not match the expected format
// //         return versionIn;
// //       }
// //     }
// //     var incrementFunc;
// //     if(status=="Reject"){
// //       incrementFunc = incrementVersion(version)||version
// //       const document = await DocumentModel.findOne({where:{ title: docName, version }});

// //     const updateDocStatus = await DocumentModel.update({version:incrementFunc}, {
// //       where: { title:  {
// //         [Sequelize.Op.like]: `%${docName}%`
// //       }}
// //     });

// //     await EstablishmentModel.update(
// //       { clientStatus:status, clientComment:commnent },
// //       { where: { docName: docName ,version:version } }
// //     );

// //     const revsId = myrecord.reviewerId.split(",")
// //     const appsId = myrecord.approverId.split(",")
// //     const reviewerStatus = Array.from({ length: revsId.length }).map(() => 0).join(', ');
// //     const approverStatus = Array.from({ length: appsId.length }).map(() => 0).join(', ');

// //     const approverComment = Array.from({ length: appsId.length }).map(() => '').join(', ');
// //     const reviewerComment = Array.from({ length: revsId.length }).map(() => '').join(', ');
// //     await EstablishmentModel.create({
// //       docName:myrecord.docName,
// //       version:incrementFunc,
// //       reviewer:myrecord.reviewer,
// //       approver:myrecord.approver,
// //       approverId:myrecord.approverId,
// //       reviewerId:myrecord.reviewerId,
// //       clientStatus:'',
// //       clientComment:'',
// //       approverStatus,
// //       reviewerStatus,
// //       approverComment,
// //       reviewerComment,
// //       companyId:myrecord.companyId,
// //       docDepartmentId:myrecord.docDepartmentId,
// //       masterDocumentCode:myrecord.masterDocumentCode,
// //       masterDocumentName:myrecord.masterDocumentName,
// //       userName:myrecord.userName
// //     }
// //     );
// //     return res.status(200).send({ message: "Document Rejected" });

// //     }
// //     else{
// //       await EstablishmentModel.update(
// //         { clientStatus:status},
// //         { where: { docName: docName,version:version } }
// //       );
// //       return res.status(200).send({ message: "Document Approved" });

// //     }

// //     console.log(EstablishmentModel);

// //     } catch (err) {
// //     console.log(err.message);
// //     res.status(500).send({ message: err.message });
// //   }
// // };

// module.exports.updateReview = async (req, res) => {
//   try {
//     const body = req.body
//     const status = body.clientStatus
//     const commnent = body.clientComment
//     const version = body.version
//     const docName = body.docName
//     const app = req.body.app
//     const rev = req.body.rev
//     const myrecord = req.body.myrecord

//     console.log(body,status,commnent,version,docName);
//     console.log(app,rev,"yreocr",myrecord)
//     function incrementVersion(versionIn) {
//       // Split the version string at the first period ('.')
//       const parts = versionIn.split('.');
    
//       // Extract the prefix and validate it
//       const prefix = parts[0];
    
//       if (/^\d{3}$/.test(prefix)) {
//         // Increment the prefix
//         const incrementedPrefix = (parseInt(prefix) + 1).toString().padStart(3, '0');
//         return incrementedPrefix;
//       } else {
//         // Return the original version if it does not match the expected format
//         return versionIn;
//       }
//     }
//     var incrementFunc;
//     if(status=="Reject"){
//       incrementFunc = incrementVersion(version)||version
//       const document = await DocumentModel.findOne({where:{ title: docName, version }});

//     const updateDocStatus = await DocumentModel.update({version:incrementFunc}, {
//       where: { title:  {
//         [Sequelize.Op.like]: `%${docName}%`
//       }}
//     });

//     await EstablishmentModel.update(
//       { clientStatus:status, clientComment:commnent },
//       { where: { docName: docName ,version:version } }
//     );

//     const revsId = myrecord.reviewerId.split(",")
//     const appsId = myrecord.approverId.split(",")
//     const reviewerStatus = Array.from({ length: revsId.length }).map(() => 0).join(', ');
//     const approverStatus = Array.from({ length: appsId.length }).map(() => 0).join(', ');

//     const approverComment = Array.from({ length: appsId.length }).map(() => '').join(', ');
//     const reviewerComment = Array.from({ length: revsId.length }).map(() => '').join(', ');
//     await EstablishmentModel.create({
//       docName:myrecord.docName,
//       version:incrementFunc,
//       reviewer:myrecord.reviewer,
//       approver:myrecord.approver,
//       approverId:myrecord.approverId,
//       reviewerId:myrecord.reviewerId,
//       clientStatus:'',
//       clientComment:'',
//       approverStatus,
//       reviewerStatus,
//       approverComment,
//       reviewerComment,
//       companyId:myrecord.companyId,
//       docDepartmentId:myrecord.docDepartmentId,
//       masterDocumentCode:myrecord.masterDocumentCode,
//       masterDocumentName:myrecord.masterDocumentName,
//       userName:myrecord.userName
//     }
//     );
//     return res.status(200).send({ message: "Document Rejected" });

//     }
//     else{
//       await EstablishmentModel.update(
//         { clientStatus:status},
//         { where: { docName: docName,version:version } }
//       );
//       return res.status(200).send({ message: "Document Approved" });

//     }


//     } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// module.exports.gettingEstablishment = async (req, res) => {
//   try {
//     const establishment = await EstablishmentModel.findAll({
//       where: { companyId: req?.body?.companyId, 
//       },
//     });
//     res.status(200).send(establishment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };

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
const { createPDF } = require("../../helpers/create-pdf");
const { createWordFile } = require("../../helpers/create-docx");
const path = require("path");
const { omit, forEach } = require("lodash");
const express = require('express');
const router = express.Router();
const json2csv = require('json2csv').parse;
const sequelize = require("sequelize")
const fs = require("fs");
const Papa = require("papaparse");
const { Sequelize, where } = require('sequelize');
const { Op } = require('sequelize');
const { reverse } = require("dns/promises");
const { version } = require("os");
const { title } = require("process");

module.exports.listDocuments = async (req, res) => {
  console.log("documents bhejoo");
  // console.log(req.query.assignedBy,req.query.userId,"assigned");
  try {
    const companyId = parseInt(req?.query?.companyId);
    const departmentId = req?.query?.department;
    const assignedTo = req?.query?.userId;
    const assignedBy = req?.query?.assignedBy;
    console.log(departmentId,assignedTo,assignedBy,'ye ha asal ');
    

    if(departmentId==undefined && !assignedTo ==undefined&&!assignedBy==undefined){
      const documents = await DocumentModel.findAll({
        where: {
          companyId: companyId,
        }
      });
      console.log('1',documents);
      return res.status(200).send(documents);
    }
    console.log(companyId,departmentId,assignedBy,assignedTo,'information');

    if(req.query.masterDocumentId){
      console.log('2yaha aya');
      const documents = await DocumentModel.findAll({
        where: {
          companyId: companyId,masterDocumentId:req.query.masterDocumentId,projectId:req.query.projectId
        }
      });
      console.log('1',documents);
      return res.status(200).send(documents);
    }

    else{
      console.log('3yaha aya');
      if(assignedTo=='1' || assignedBy=='1'){
        let documents = await DocumentModel.findAll({
        where: {
          companyId: companyId,
        }
      });
      console.log('2',documents);
      const myAssignedToUsers = documents.map(document => document.dataValues.assignedTo);
      const users = await UserModel.findAll({
        where: {
          id: myAssignedToUsers
        }
      });
      
      // const myDocuments = await Promise.all(documents.map(async document => {
      //   const assignedToIds =document.assignedTo!= ''|| null && document.assignedTo.split(','); // Split the assignedTo field into an array of IDs
      //   console.log(assignedToIds,'assignedToIds');
        
      //   const assignedToNames = assignedToIds.map(id => {
      //     console.log(id,'id');
          
      //     const user = users.find(user => user.id == id); // Find the user by ID
          
      //     return user ? `${user.dataValues.firstName} ${user.dataValues.lastName}` : null; // Get the full name
      //   }).filter(name => name !== null); // Remove any null values
      
      //   document.dataValues["assignedToName"] = assignedToNames.join(', '); // Join the names into a comma-separated string
      
      //   return document;
      // }));
      
      
      return res.status(200).send(documents);    
    }
    else{
      console.log("LOG YAHA AYA");
      
        // let documents = await DocumentModel.findAll({
        //   where: {
        //     companyId: companyId,
        //     departmentId: {
        //       [Sequelize.Op.like]: `%${departmentId}%` // Using Sequelize operator for LIKE clause
        //     },
        //     [Op.or]: [
                
        //       {
        //         assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
        //       }
        //     ]
            // [Op.or]: [
            //   // {
            //   //   assignedBy: {
            //   //     [Op.gte]: assignedBy // Matches or greater than assignedBy from query param
            //   //   }
            //   // },
            //   // { 
            //   //   assignedFrom: assignedTo // Matches assignedTo from query param
            //   // },
            //   {
            //     assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
            //   }
            // ]
        //   }
          
        // });
// /////////////////////////KNOWLEDGE/////////////////////////////////////////////////////

// assigned to is the user id to which doc is assigned
// assignedBy is ROLEID who has assigned doc to user
// assigned from is the user ID who has assigned doc to user
        let documents = await DocumentModel.findAll({
     where: {
            companyId: companyId,
            departmentId: {
              [Sequelize.Op.like]: `%${departmentId}%` // Using Sequelize operator for LIKE clause
            },
            [Op.or]: [
                
              {
                assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
              }
            ],
            [Op.or]: [
              {
                assignedBy: {
                  [Op.gte]: assignedBy // Matches or greater than assignedBy from query param
                }
              },
              { 
                assignedFrom: assignedTo // Matches assignedTo from query param
              },
              {
                assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
              }
            ]
          }
        });
        
        console.log(documents,'documentsdocuments');
        
        // if (documents.length==0) {
        //   console.log('documentsdocumentsdocumentsdocuments');
          
        //   documents = await DocumentModel.findAll({
        //     where: {
        //       companyId: companyId,
            
              
        //       [Op.or]: [
                
        //         {
        //           assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
        //         }
        //       ]
        //     }
            
        //   });
          
        // }
        console.log('3 data aya ha ',documents);
        const myAssignedToUsers = documents.map(document => document.dataValues.assignedTo);
  
        const users = await UserModel.findAll({
          where: {
            id: myAssignedToUsers
          }
        });
        // console.log('my users', users);
        
        const myDocuments = await Promise.all(documents.map(async document => {
          users.forEach(user => {
            // Assuming document.assignedTo is a comma-separated string like "1,2,3"
// And user.dataValues contains id, firstName, and lastName

if (document.assignedTo) {
  // Split the assignedTo string into an array of IDs
  const assignedToIds = document.assignedTo.split(',');
  console.log(assignedToIds,'assignedToIds');
  
  // Initialize an array to store matching names
  const assignedToNames = [];

  // Iterate over the IDs and check for a match with the current user's ID
  assignedToIds.forEach(id => {
    if (id == user.dataValues.id) {
      // If a match is found, add the corresponding name to the array
      assignedToNames.push(user.dataValues.firstName + ' ' + user.dataValues.lastName);
    }
  });
  console.log(assignedToIds,'assignedToIds');

  // If there are any matching names, join them and add to the document's dataValues
  if (assignedToNames.length > 0) {
    console.log(assignedToNames,'assignedToNames');

    document.dataValues["assignedToName"] = assignedToNames.join(', ');
    // console.log(document, 'doc');
  }
}

          });
          return document;
        }));
        
        console.log(myDocuments, 'mydocs');
        return res.status(200).send(myDocuments);    }
  }
  } catch (err) {
    console.log('error',err.message);
    res.status(500).send({ message: err.message });
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
    const log = `${req?.body?.userName} Created Document ${req?.body?.title}`;
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
      req.body.status=null;
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
            await SystemLogModel.create({
              companyId: req.body.companyId,
              typeOfLog: "7a",
              userId: approverId.trim(), // Trim to remove any leading/trailing whitespace
              departmentId: departmentId.trim(),
              title: log,
            });
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
            await SystemLogModel.create({
              companyId: req.body.companyId,
              typeOfLog: "7b",
              userId: reviewerId.trim(), // Trim to remove any leading/trailing whitespace
              departmentId: departmentId.trim(),
              title: log,
            });
            await SystemLogModel.create({
              companyId: req.body.companyId,
              typeOfLog: "7b",
              userId: approverId.trim(), // Trim to remove any leading/trailing whitespace
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

module.exports.updateMDR = async (req, res) => {
  try {
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

    const updateDocStatus = await DocumentModel.update({version:incrementFunc}, {
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
        { clientStatus:status},
        { where: { docName: docName,version:version } }
      );
      const latestDocuments = await EstablishmentModel.findAll({
        where: {
          masterDocumentCode: myrecord.masterDocumentCode,companyId:myrecord.companyId
        },
        attributes: [
          'docName',
          [Sequelize.fn('MAX', Sequelize.col('clientStatus')), 'clientStatus'],  // Get the latest clientStatus
          [Sequelize.fn('MAX', Sequelize.col('version')), 'version']  // Get the latest version
        ],
        group: ['docName'],
        order: [[Sequelize.fn('MAX', Sequelize.col('version')), 'DESC']],
        having: Sequelize.literal(`version = (SELECT MAX(version) FROM \`establishments\` WHERE \`masterDocumentCode\` = '${myrecord.masterDocumentCode}' AND \`docName\` = \`establishments\`.\`docName\`)`)
      });
      
      // Check if all documents have clientStatus as "Accept"
      const allAccepted = latestDocuments.every(doc => doc.clientStatus === 'Accept');
        console.log('hi',allAccepted);
         
      if (allAccepted) {
        await MDRModel.update(
          { status:'Completed'},
          { where: { mdrCode: myrecord.masterDocumentCode,companyId: myrecord.companyId } }
        );
       
          // All latest documents have clientStatus as "Accept"
      } else {
        console.log('falseeeee');  // Not all documents have clientStatus as "Accept"
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
//   const getLatestDocuments = (documentList) => {
//     const groupedDocuments = {};
//     // Group documents by docName
//     documentList.forEach((doc) => {
//         if (!groupedDocuments[doc.docName]) {
//             groupedDocuments[doc.docName] = [];
//         }
//         console.log(groupedDocuments[doc.docName],'docNameAya');
//         groupedDocuments[doc.docName].push(doc);

//     });
//     console.log(groupedDocuments,'documentss');
//     // Get the latest document for each docName based on version
//     const latestDocuments = [];
//     for (const docName in groupedDocuments) {
//         const documents = groupedDocuments[docName];
//         console.log(documents,'logging');
//         // Sort documents by version in ascending order
//         documents.sort((a, b) => {
//             if (a.version < b.version) return -1;
//             if (a.version > b.version) return 1;
//             return 0;
//         });

//         // Get the latest (highest version) document
//         const latestDocument = documents[documents.length - 1];
//         console.log(latestDocument,'latestDoc');
//         latestDocuments.push(latestDocument);
//     }
//     return latestDocuments;
// };



  console.log(req.query.userId,"req.query.userId");
  console.log(req.query.roleId,"req.query.roleId");
  if(req.query.roleId == 1){
    const establishment = await EstablishmentModel.findAll({
      where: { companyId: req?.query?.companyId,},
    });


    
    const latestDocuments = establishment;
    console.log(latestDocuments,"latests only");
    return res.status(200).send(latestDocuments);
  }

  if(req.query.roleId == 6){
    console.log("yaha ayega");
    console.log(req.query.companyId,'companyID');
    
    const establishment = await EstablishmentModel.findAll({
      where: { companyId:req.query.companyId , sendToClient:true
      },
     
    });
    console.log(establishment,'establishing');
    const latestDocuments = establishment;
    console.log(latestDocuments,'lateststabling');
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
  console.log(latestDocuments,"latestones ");

    console.log(establishment,"establishment ai");
    return res.status(200).send(latestDocuments);
  } catch (err) {
    console.log('error',err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.Accept = async (req, res) => {
  console.log("yaha aa");
  try {
    const docName = req.body.docName;
    const approverStatus=req.body.appStatusArr;
    const reviewerStatus=req.body.revStatusArr;
    const app=req.body.app;
    const rev=req.body.rev;
    const companyId = req.body.companyId
    console.log(reviewerStatus,approverStatus,'status');
    const versionIn= req.query.version;
    const appIds  = app.split(",")
    const revIds = rev.split(",")
    appArray=approverStatus.split(',');
    revArray=reviewerStatus.split(',');

const document = await DocumentModel.findOne({where:{ title: docName }});
let version = document ? document.version : null;
let status = 'Uploaded'
if (revArray.every(num => num == 1) && appArray.every(num => num == 0)) {
    status = 'Reviewers Rejected';
} else if (appArray.every(num => num == 1)) {
    status = 'Approvers Rejected';
}
else if(revArray.every(num => num == 2) &&appArray.every(num => num == 0))
{
status='Pending for Approval';
}

else if(appArray.every(num => num == 2))
{
status='Approved(in-house)';
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
      { reviewerStatus,approverStatus },
      { where: { docName: docName , version:versionIn } }
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
      title: `Document ${docName} Accepted!`,
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
      title: `Document ${docName} Accepted!`,
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
    const versionIn = req.query.version
    const userName = req.query.userName 
    const approver = req.query.approver 
    const reviewer = req.query.reviewer 
    const approverId = req.query.approverId 
    const reviewerId = req.query.reviewerId 
    const companyId = req.query.companyId 
    const masterDocumentCode = req.query.masterDocumentCode 
    const masterDocumentName = req.query.masterDocumentName 
    const docDepartmentId = req.query.docDepartmentId 
    const role = req.query.yourRole 
    const docName = req.body.docName;
    const approverStatus=req.body.appStatusArr;
    const reviewerStatus=req.body.revStatusArr;

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
        console.log("no");
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


    const updatedVersion = incrementVersion(versionIn);

    appArray=approverStatus.split(',');
    revArray=reviewerStatus.split(',');

    const approverComment=req.body.approverComment;
    const reviewerComment=req.body.reviewerComment;

    if(approverComment || reviewerComment){
      var appComment=approverComment.split(',');
      var revComment=reviewerComment.split(',');
    }



let status='Uploaded';

const document = await DocumentModel.findOne({where:{ title: docName }});
let version = document ? document.version : null;

if (revArray.every(num => num == 1) && appArray.every(num => num == 0)) {
    status = 'Reviewers Rejected';
    version = incrementVersion(version, true);
} else if (appArray.every(num => num == 1) && revArray.every(num => num == 2)) {
    status = 'Approvers Rejected';
    version = incrementVersion(version, false);
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

const updateDocStatus = await DocumentModel.update({status,version}, {
  where: { title:  {
    [Sequelize.Op.like]: `%${docName}%`
  }}
});
    console.log(docName);

 


    const updateCheck = await EstablishmentModel.findOne({
      where: { docName: docName }
    });


    
    if (!updateCheck) {
      return res.status(404).send({ message: "Document not found" });
    }
    
    // Check reviewerStatus for any '0'
    if (updateCheck.reviewerStatus && updateCheck.reviewerStatus.includes('0') && role === "Approver") {
      return res.status(200).send({ message: "Reviewer Status is not completed yet" });
    }
    
    // Update document with new status values
    await EstablishmentModel.update(
      { reviewerStatus,approverStatus, approverComment, reviewerComment },
      { where: { docName: docName,version:versionIn } }
    );

    // const departmentIds = docDepartmentId.split(',');
    // const reviewerIds = reviewerId.split(",")
    // const approverIds = approverId.split(",")
    // await Promise.all(
    //   departmentIds.map(async (departmentId) => {
    //     const user = await  UserModel.findOne({
    //       where:{
    //         roleId:2,
    //         departmentId:departmentId
    //       }
    //     })
    //     await SystemLogModel.create({
    //       companyId: companyId,
    //       typeOfLog: 14,
    //       userId: 1,
    //       departmentId:departmentId,
    //       title: `Document ${docName} version & status updated!`,
    //     });
    //   })
    // );

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
      where: { docName: docName }
    });
    
    if (!updatedDocument) {
      return res.status(404).send({ message: "Document not found after update" });
    }
    
    // Check if all reviewerStatus and approverStatus are '1'
    const reviewerStatusParts = updatedDocument.reviewerStatus.split(',');
    const approverStatusParts = updatedDocument.approverStatus.split(',');
    
    const allReviewersApproved = reviewerStatusParts.every(part => part.trim() === '1');
    const allApproversApproved = approverStatusParts.every(part => part.trim() === '1');
    
    // If any status is not '1', request a new version
    if (allReviewersApproved) {
//       console.log(record, "record");
//       console.log(record.reviewerId,record.approverId,'Ids');
// Check if 'approverId' exists and is a string before splitting
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
      approverStatus:approverStatuses,reviewerStatus:reviewerStatuses,approverComment,reviewerComment,companyId,docDepartmentId,masterDocumentCode,masterDocumentName
    };
      
      const newRecord = await EstablishmentModel.create(recordData)

      docDepartmentId,
      reviewer,
      approver,



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
      await SystemLogModel.create({
        companyId: companyId,
        typeOfLog: 13,
        title: ``,
      });

      return res.status(200).send({ message: "Please upload a new version now!" });
    }
    
    // If all statuses are '1', return success message
    return res.status(200).send({ message: "Document Status updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.createPermission = async (req, res) => {
  try {
    if (req?.body?.createDocument) req.body.reviewDocument = 1;
    
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
      const updatedDocument = await CommentsModel.update({comments,Resolved:true}, {
      
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