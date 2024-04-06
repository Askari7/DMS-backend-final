const db = require("../../models/index");
const DocumentModel = db.documents;
const CommentsModel = db.comments;
const EstablishmentModel = db.establishments;

const DepartmentModel = db.departments;
const ProjectModel = db.projects;

const MDRModel = db.master_document_registers;
const DocumentPermssionModel = db.user_document_permissions;
const SystemLogModel = db.system_logs;
const CompanyModel = db.company;
const { createPDF } = require("../../helpers/create-pdf");
const { createWordFile } = require("../../helpers/create-docx");
const path = require("path");
const { omit } = require("lodash");
const express = require('express');
const router = express.Router();
const json2csv = require('json2csv').parse;

const fs = require("fs");
const Papa = require("papaparse");
const { Sequelize } = require('sequelize');
const { Op } = require('sequelize');
const { reverse } = require("dns/promises");
const { version } = require("os");

module.exports.listDocuments = async (req, res) => {
  try {
    const companyId = parseInt(req?.query?.companyId);
    const departmentId = req?.query?.department;
    const assignedTo = req?.query?.userId;
    const assignedBy = req?.query?.assignedBy;
    console.log('hello');
    console.log('hi',typeof(companyId),req.query.masterDocumentId,req.query.projectId);
    if(req.query.masterDocumentId){
      const documents = await DocumentModel.findAll({
        where: {
          companyId: companyId,masterDocumentId:req.query.masterDocumentId,projectId:req.query.projectId
        }
      });
      return res.status(200).send(documents);
    }
if(assignedTo=='1'){
  const documents = await DocumentModel.findAll({
    where: {
      companyId: companyId,
    }
  });
  return res.status(200).send(documents);

}
else{
    const documents = await DocumentModel.findAll({
      where: {
        companyId: companyId,
        departmentId: {
          [Sequelize.Op.like]: `%${departmentId}%` // Using Sequelize operator for LIKE clause
        },
        
        [Op.or]: [
          {
            assignedBy: {
              [Op.gte]: assignedBy // Matches or greater than assignedBy from query param
            }},
           { assignedFrom: assignedTo // Matches assignedTo from query param
          },
          {
            assignedTo: { [Sequelize.Op.like]: `%${assignedTo}%`} // Matches assignedTo from query param
          }
        ]
        
      }
    });

    return res.status(200).send(documents);
  }
  } catch (err) {
    console.log('error',err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listMDR = async (req, res) => {
  try {
    const mdr = await MDRModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    return res.status(200).send(mdr);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

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
    await SystemLogModel.create({
      title: `${req?.body?.authorName} Created MDR ${req?.body?.title}`,
      companyId: req?.body?.companyId,
    });
    return res.status(200).send({ message: "Master Document Register Created" });
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

      req.body.approverStatus = Array.from({ length: appName.length }).map(() => 0).join(', ');
      req.body.reviewerStatus = Array.from({ length: revName.length }).map(() => 0).join(', ');;

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
    await SystemLogModel.create({
      title: log,
      companyId: req?.body?.companyId,
    });
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
    // await SystemLogModel.update({
    //   title: `${req?.body?.authorName} Created MDR ${req?.body?.title}`,
    //   companyId: req?.body?.companyId,
    // });
    return res.status(200).send({ message: "Document Assigned" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateMDR = async (req, res) => {
  try {
    
    console.log("body",req.body);
    const recordData = JSON.parse(req.body.record);
    console.log(recordData,"recordData");
    const { projectId, projectCode,mdrCode } = recordData;

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
      companyId: req?.body?.companyId,
    });

    return res.status(200).send({ message: "Document uploaded" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.listEstablishment = async (req, res) => {
  if(req.body.userId==1){
    const establishment = await EstablishmentModel.findAll({
      where: { companyId: req?.query?.companyId, 
       
      },
     
    });
    return res.status(200).send(establishment);
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
      return res.status(200).send(establishment);
    } catch (err) {
      console.log('error',err.message);
      res.status(500).send({ message: err.message });
    } 
  }
  try {
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
    return res.status(200).send(establishment);
  } catch (err) {
    console.log('error',err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.updateDocStatus = async (req, res) => {
  try {
    console.log('########',req.body);
    const docName = req.body.docName;
approverStatus=req.body.appStatusArr;
reviewerStatus=req.body.revStatusArr;

approverComment=req.body.approverComment;
reviewerComment=req.body.reviewerComment;


appArray=approverStatus.split(',');
revArray=reviewerStatus.split(',');
appComment=approverComment.split(',');
revComment=reviewerComment.split(',');
let status='Uploaded';
let version='';
if(revArray.every(num => num == 1)&&appArray.every(num => num == 0))
{
status='Reviewers Rejected'
version='000.1';
}
else if(revArray.every(num => num == 2) &&appArray.every(num => num == 0))
{
status='Pending for Approval';
}
else if(appArray.every(num => num == 1) &&revArray.every(num => num == 2))
{
status='Approvers Rejected'
version='001';

}
else if(appArray.every(num => num == 2)&&revArray.every(num => num == 2))
{
status='Approved(in-house)';
}
const updateDocStatus = await DocumentModel.update({status,version}, {
  where: { title:  {
    [Sequelize.Op.like]: `%${docName}%`
  }}
});
    console.log(docName);
    // const log = `${req?.body?.userName} Uploaded Document ${req?.body?.title}`;
    // const body = omit(req.body, ["roleId", "userId", "userName"]);

    // Update document if it exists, otherwise create a new one
    const updatedDocument = await EstablishmentModel.update({approverStatus,reviewerStatus,approverComment,reviewerComment}, {
      where: { docName:docName
      }
    });

console.log('helooo',updatedDocument);
    // await SystemLogModel.create({
    //   title: log,
    //   companyId: req?.body?.companyId,
    // });

    return res.status(200).send({ message: "Document uploaded" });
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
    console.log(req.body);

    const comments = await CommentsModel.create(req?.body);
    console.log('hi',comments);
    // await SystemLogModel.create({
    //   title: `${req?.body?.authorName} Created MDR ${req?.body?.title}`,
    //   companyId: req?.body?.companyId,
    // });
    return res.status(200).send({ message: "Comment saved into DB" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.uploadComment = async (req, res) => {
  try {
    console.log(req.body);

    const comments = req.body.comments;
    const docName = req.body.docName;

    // const log = `${req?.body?.userName} replied to comment ${req?.body?.title}`;
    // const body = omit(req.body, ["roleId", "userId", "userName"]);
// const status='Uploaded';
    // Update document if it exists, otherwise create a new one
    const updatedDocument = await CommentsModel.update({comments}, {
      where: { docName: docName }
    });

// console.log('helooo',updatedDocument);
//     await SystemLogModel.create({
//       title: log,
//       companyId: req?.body?.companyId,
//     });

    return res.status(200).send({ message: "Comment reply sent" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.listComments = async (req, res) => {
  try {
    const comments = await CommentsModel.findAll({
      where: { docName: req?.query?.docName },
    });
    const commentsObject = comments.map(comment => comment.comments);

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