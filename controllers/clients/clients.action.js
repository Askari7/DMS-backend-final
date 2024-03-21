const db = require("../../models/index");
const ClientModel = db.clients;
const ClientOfficialModel = db.clientOfficials;
const MDRModel = db.master_document_registers;
const ProjectModel = db.projects;
const config = require("../../config/auth.config");

module.exports.createClient = async (req, res) => {
  try {
    const { body } = req;
    if(body.clientName){
      const clients = await ClientOfficialModel.create(body);
      return res.status(200).send({ message: "Client Official has been Created" });
    }
    else{
      const clients = await ClientModel.create(body);
      return res.status(200).send({ message: "Client has been Created" });
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
  try {if(req.query.recordId){
    
    const recordId = JSON.parse(req.query.recordId);
    const masterDocumentCode = recordId.masterDocumentCode;    
    const mdrRecords = await MDRModel.findAll({ mdrCode:masterDocumentCode });
    console.log(mdrRecords,"MDR RECORDS");
    // 2. Extract projectId from fetched records
    const projectIds = mdrRecords.map(record => record.projectId);
    console.log(projectIds,"IDS RECORDS");

    // 3. Fetch records from ProjectModel where projectId matches
    const projects = await ProjectModel.findAll({ projectId: { $in: projectIds } });
    console.log(projects,"Projects RECORDS");


    // 4. Extract clientId from fetched projects
    const clientIds = projects.map(project => project.clientId);
    console.log(clientIds,"CLIENTS IDS RECORDS");

    // 5. Fetch records from ClientOfficials where companyId matches clientIds
    var clients = await ClientOfficialModel.findAll({ companyId: { $in: clientIds } });
    console.log(clients,"RECORDS");
  }else{
    clients = await ClientModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    console.log(clients,"RECORDS");

  }
    return res.status(200).send(clients);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.fetchOfficials = async (req, res) => {
  try {
    console.log(req.query.companyId,"id");
    const users = await ClientOfficialModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    console.log(users);
    return res.status(200).send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};