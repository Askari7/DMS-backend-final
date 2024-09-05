const db = require("../../models/index");
const ProjectModel = db.projects;
const ClientModel = db.clients;
const EstablishmentModel = db.establishments
const MDRModel = db.master_document_registers;
const { Op } = require('sequelize');
const DepartmentModel = db.departments;
const UserModel = db.users;
const SystemLogModel = db.system_logs;
const CompanyModel = db.company;
const dayjs = require("dayjs");
const { includes, map } = require("lodash");

module.exports.getStats = async (req, res) => {
  const id = req.query.id
  try {
    const roleIds = [2, 3, 4, 5];

    const employeeCount = await UserModel.count({
      where: {
        companyId: req?.query?.companyId,
        roleId: {
          [Op.in]: roleIds,
        },
        removed:false
      },
    });
    
    const roleCounts = {};
    
    for (const roleId of roleIds) {
      const count = await UserModel.count({
        where: {
          companyId: req?.query?.companyId,
          roleId: roleId,
          removed:false
        },
      });
      roleCounts[roleId] = count;
    }
    
    console.log("Total employee count:", employeeCount);
    console.log("Employee counts for each role:", roleCounts);

    
    
    const projectCount = await ProjectModel.count({
      where: {
        companyId: req?.query?.companyId,
        removed:false

      },
    });

    const clientCount = await ClientModel.count({
      where: {
        companyId: req?.query?.companyId,
      },
    });
    const departmentCount = await DepartmentModel.count({
      where: {
        companyId: req?.query?.companyId,
        removed:false
      },
    });

    const mdrCount = await MDRModel.count({
      where: {
        companyId: req?.query?.companyId,
        removed:false

      },
    });

    const company = await CompanyModel.findOne({
      where: {
        id: req?.query?.companyId,
      },
      attributes: ['name'], // Only retrieve the 'name' attribute
    });
    
    const approvalCount = await EstablishmentModel.findAll({
      where: {
        companyId:req.query.companyId
      }
    });

    console.log(approvalCount,'counts');
    
    const filteredEstablishments = approvalCount.map(establishment => {
      const reviewerIds = establishment.dataValues.reviewerId.split(',').map(id => id.trim());
      const approverIds = establishment.dataValues.approverId.split(',').map(id => id.trim());
    
      const reviewerIndex = reviewerIds.indexOf(id);
      const approverIndex = approverIds.indexOf(id);

      console.log(reviewerIds,approverIds,reviewerIndex,approverIndex,'APP REV ID Index');
      
    
      if (reviewerIndex !== -1 || approverIndex !== -1) {
        return {
          ...establishment,
          reviewerIndex: reviewerIndex !== -1 ? reviewerIndex : null,
          approverIndex: approverIndex !== -1 ? approverIndex : null
        };
      }
    
      return null;
    }).filter(establishment => establishment !== null);
    
    let reviewerCount = 0;
    let approverCount = 0;
    
    filteredEstablishments.forEach(establishment => {
      const reviewerStatuses = establishment.dataValues.reviewerStatus.split(',');
      const approverStatuses = establishment.dataValues.approverStatus.split(',');
      console.log(reviewerStatuses,approverStatuses,"Statess");
      console.log(reviewerStatuses,approverStatuses,"statuses");
      console.log(establishment.reviewerIndex,'index for reviewer');
      console.log(reviewerStatuses[establishment.reviewerIndex],'index at it ');
      
      if (establishment.reviewerIndex !== null && reviewerStatuses[establishment.reviewerIndex] && reviewerStatuses[establishment.reviewerIndex].trim() == '0') {
        reviewerCount++;
      }
      console.log(establishment.approverIndex,'index for approverIndex');

      if (establishment.approverIndex !== null && approverStatuses[establishment.approverIndex]&& approverStatuses[establishment.approverIndex].trim() == '0') {
        approverCount++;
      }
    });
    
    // console.log(filteredEstablishments, 'filteredEstablishments');
    console.log('Reviewer Count:', reviewerCount);
    console.log('Approver Count:', approverCount);

    const companyName = company ? company.name : null; // Retrieve the company name
    
    console.log("Company Name:", companyName);
    
    const logs = await SystemLogModel.findAll({
      where: { companyId: req?.query?.companyId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    console.log(logs,'logslogs');
    
    const data = [];
    for (const log of logs) {
      data.push({
        id: log?.id,
        title: log?.title,
        createdAt: dayjs(log?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      });
    }

    return res.status(200).send({
      employeeCount,
      roleCounts,
      projectCount,
      departmentCount,
      mdrCount,
      clientCount,
      companyName,
      reviewerCount,
      approverCount,
      // approvalCount,
      // reviewCounts,
      logs: data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

