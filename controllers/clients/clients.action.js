const { Op, where } = require('sequelize');

const db = require("../../models/index");
const ClientModel = db.clients;
const ClientOfficialModel = db.clientOfficials;
const MDRModel = db.master_document_registers;
const ProjectModel = db.projects;
const CompanyModal = db.company;
const UserModel = db.users;
const EstablishmentModel = db.establishments;
const SystemLogModel = db.system_logs;

const bcrypt = require("bcryptjs")
const config = require("../../config/auth.config");
const { sendClientEmail } = require('../../helpers/send-email-client');
const { generateRandomPassword } = require('../../helpers/generate-user-password');
const { sendEmail } = require("../../helpers/send-email");

module.exports.createClient = async (req, res) => {
  try {
    const { body } = req;
    if(body.clientName){

      const Client = await UserModel.findOne(
        {
          where: {
            email:body.Email,companyId:body.userCompanyId
          }
        }
      );
      if(!Client){
      const clients = await ClientOfficialModel.create(body);
      const password = generateRandomPassword(10);
      body.password = password;
      body.roleId = 6
      body.firstName = body.clientName
      body.lastName=''
      body.email=body.Email
      body.department = ""
      body.departmentId = ""
      body.companyId=body.userCompanyId
      body.password = bcrypt.hashSync(password, 8);
      const users = await UserModel.create(body);
      
      body.password = password;
      await sendEmail(body);
      return res.status(200).send({ message: "Client Official has been Added" });
    }
    return res.status(200).send({ message: "This email already exist!" });

  }

    else{
      const Client = await ClientModel.findOne(
        {
          where: {
            companyName:req.body.companyName,
            companyId:req.body.companyId
          }
        }
      );
      console.log(Client,'ClientClientClient');
      
      if (Client) {
        return res.status(409).send({ message: "Client with this name already exist" });
      }
      const clients = await ClientModel.create(body);
      return res.status(200).send({ message: "Client Company has been Created" });
    }    
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.sendEmailClient = async (req, res) => {
  try {
    const { body } = req;
    const docName = body.docName
    const version = body.docVersion
    const record = body.parsedRecord
    const Email = body.clientName
    body.mainUrl = "http://localhost:3000/pages/authentication/login"
    const Client = await UserModel.findOne(
      {
        where: {
          email:Email,
        }
      }
    );
    body.password = Client.password

    const check = await EstablishmentModel.findOne({
      where: {
        docName: docName,
        version: version
      }
    })

    console.log(check.status,'statuss');
    

    if (check.status == "Approved(in-house)") {
      const change = await EstablishmentModel.update(
        { sendToClient: true },
        {
          where: {
            docName: docName,
            version: version
          }
        }
      );
  
  
      await sendClientEmail(body);
      await SystemLogModel.create({
        companyId: change.companyId,
        typeOfLog: 25,
        title: `Document ${docName} version ${version} is available to view`,
        userId: Client.id,
      });
        return res.status(200).send({ message: "Email sent to client" });
    }
    else{
      console.log("Complete All Review and Approve procedure for Inhouse Assessment");
      
      return res.status(200).send({ message: "Complete All Review and Approve procedure for Inhouse Assessment" });
    }
      
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.getClient = async (req, res) => {
  try {
    const user = await ClientModel.findOne({
      where: { id: req?.params?.id },
    });

    return res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listClients = async (req, res) => {
  try {
    if(req.query.recordId){
      console.log(req.query.recordId,"idi");
    const recordId = JSON.parse(req.query.recordId);
    const masterDocumentCode = recordId.masterDocumentCode;    
    const mdrRecords = await MDRModel.findAll({
      where: {
        mdrCode: masterDocumentCode
      }
    });    console.log(mdrRecords,"MDR RECORDS");
    // 2. Extract projectId from fetched records
    const projectIds = mdrRecords.map(record => record.projectId);
    console.log(projectIds,"IDS RECORDS");

    // 3. Fetch records from ProjectModel where projectId matches
    const projects = await ProjectModel.findAll({
      where: {
        id: {
          [Op.in]: projectIds
        }
      }
    });    console.log(projects,"Projects RECORDS");


    // 4. Extract clientId from fetched projects
    const clientIds = projects.map(project => project.clientId);
    console.log(clientIds,"CLIENTS IDS RECORDS");

    // 5. Fetch records from ClientOfficials where companyId matches clientIds
    const clients = await ClientOfficialModel.findAll({ where:{companyId: { [Op.in]: clientIds } }});
    console.log(clients,"RECORDS");
    return res.status(200).send(clients);

  }else{
    clients = await ClientModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    console.log(clients,"RECORDS");
    return res.status(200).send(clients);

  }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.fetchOfficials = async (req, res) => {
  try {
    console.log(req.query.companyId,"idi");
    const users = await ClientOfficialModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    // console.log(users);
    return res.status(200).send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.fetchCompany = async (req, res) => {
  try {
    const users = await CompanyModal.findOne({
      where: { id: req?.query?.companyId },
    });
    return res.status(200).send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};



module.exports.UpdateCompany = async (req, res) => {
  try {
    const companyId = req.query.companyId;
    const updatedData = req.body;
    const updatedCompany = await CompanyModal.update(updatedData, { where: { id: companyId } });    
    return res.status(200).send(updatedCompany);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
