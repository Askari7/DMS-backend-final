const db = require("../../models/index");
const ClientModel = db.clients;
const ClientOfficialModel = db.clientOfficials;

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
  try {
    const users = await ClientModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    return res.status(200).send(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
