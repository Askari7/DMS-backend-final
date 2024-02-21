const db = require("../../models/index");
const ProjectModel = db.projects;
const ClientModel = db.clients;
const MDRModel = db.master_document_registers;
const { Op } = require('sequelize');
const DepartmentModel = db.departments;
const UserModel = db.users;
const SystemLogModel = db.system_logs;
const CompanyModel = db.company;
const dayjs = require("dayjs");
module.exports.getStats = async (req, res) => {
  try {
    const roleIds = [2, 3, 4, 5];

    const employeeCount = await UserModel.count({
      where: {
        companyId: req?.query?.companyId,
        roleId: {
          [Op.in]: roleIds,
        },
      },
    });
    
    const roleCounts = {};
    
    for (const roleId of roleIds) {
      const count = await UserModel.count({
        where: {
          companyId: req?.query?.companyId,
          roleId: roleId,
        },
      });
      roleCounts[roleId] = count;
    }
    
    console.log("Total employee count:", employeeCount);
    console.log("Employee counts for each role:", roleCounts);

    
    
    const projectCount = await ProjectModel.count({
      where: {
        companyId: req?.query?.companyId,
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
      },
    });

    const mdrCount = await MDRModel.count({
      where: {
        companyId: req?.query?.companyId,
      },
    });

    const company = await CompanyModel.findOne({
      where: {
        id: req?.query?.companyId,
      },
      attributes: ['name'], // Only retrieve the 'name' attribute
    });
    
    console.log(company);
    const companyName = company ? company.name : null; // Retrieve the company name
    
    console.log("Company Name:", companyName);
    
    const logs = await SystemLogModel.findAll({
      where: { companyId: req?.query?.companyId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

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
      logs: data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
