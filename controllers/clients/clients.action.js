// const { Op } = require('sequelize');

// const db = require("../../models/index");
// const ClientModel = db.clients;
// const ClientOfficialModel = db.clientOfficials;
// const CompanyModel = db.company;
// const MDRModel = db.master_document_registers;
// const ProjectModel = db.projects;

// const config = require("../../config/auth.config");
// const { sendEmail, sendClientEmail } = require('../../helpers/send-email-client');

// module.exports.createClient = async (req, res) => {
//   try {
//     const { body } = req;
//     if(body.clientName){
//       const clients = await ClientOfficialModel.create(body);
//       return res.status(200).send({ message: "Client Official has been Added" });
//     }
//     else{
//       const clients = await ClientModel.create(body);
//       return res.status(200).send({ message: "Client Company has been Created" });
//     }    
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };
// module.exports.sendEmailClient = async (req, res) => {
//   try {
//     const { body } = req;
//     console.log('api hit bodu',body);
//     await sendClientEmail(body);
//       return res.status(200).send({ message: "Email sent to client" });
      
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };

// // module.exports.getClient = async (req, res) => {
// //   try {
// //     const user = await ClientModel.findOne({
// //       where: { id: req?.params?.id },
// //     });

// //     return res.status(200).send(user);
// //   } catch (err) {
// //     console.log(err.message);
// //     res.status(500).send({ message: err.message });
// //   }
// // };

// // module.exports.listClients = async (req, res) => {
// //   try {
// //     if(req.query.recordId){
// //     console.log(req.query.recordId,"idi");
// //     const recordId = JSON.parse(req.query.recordId);
// //     const masterDocumentCode = recordId.masterDocumentCode;    
// //     const mdrRecords = await MDRModel.findAll({
// //       where: {
// //         mdrCode: masterDocumentCode
// //       }
// //     });    
// //     // 2. Extract projectId from fetched records
// //     const projectIds = mdrRecords.map(record => record.projectId);


// //     // 3. Fetch records from ProjectModel where projectId matches
// //     const projects = await ProjectModel.findAll({
// //       where: {
// //         id: {
// //           [Op.in]: projectIds
// //         }
// //       }
// //     });    


// //     // 4. Extract clientId from fetched projects
// //     const clientIds = projects.map(project => project.clientId);

// //     // 5. Fetch records from ClientOfficials where companyId matches clientIds
// //     const clients = await ClientOfficialModel.findAll({ where:{companyId: { [Op.in]: clientIds } }});
// //     return res.status(200).send(clients);

// //   }else{
// //     clients = await ClientModel.findAll({
// //       where: { companyId: req?.query?.companyId },
// //     });
// //     return res.status(200).send(clients);

// //   }
// //   } catch (err) {
// //     console.log(err.message);
// //     res.status(500).send({ message: err.message });
// //   }
// // };

// // module.exports.fetchOfficials = async (req, res) => {
// //   try {
// //     console.log(req.query.companyId,"idi");
// //     const users = await ClientOfficialModel.findAll({
// //       where: { companyIdOfClient: req?.query?.companyId },
// //     });
// //     console.log(users);
// //     return res.status(200).send(users);
// //   } catch (err) {
// //     console.log(err.message);
// //     res.status(500).send({ message: err.message });
// //   }
// // };

// module.exports.FetchClientAndOfficials = async (req, res) => {
//   try {
//     // Fetch Company along with its Clients and ClientOfficials in a single query
//     let data = await CompanyModel.findOne({
//       where: { id: req.query.companyId }, 
//       attributes: ['id', 'name'], // Specify attributes to retrieve from CompanyModel
//       include: [
//         {
//           model: ClientModel,
//           include: [
//             {
//               model: ClientOfficialModel,
//             }
//           ]
//         }
//       ]
//     });

//     if (!data) {
//       return res.status(404).json({ message: 'Company not found' });
//     }

//     return res.status(200).json({ data }); // Return data as JSON response
//   } catch (error) {
//     console.error("Error:", error); // Log any errors for debugging
//     res.status(500).send({ message: error.message }); // Return error message as response
//   }
// }



// module.exports.fetchCompany = async (req, res) => {
//   try {
//     const users = await CompanyModal.findOne({
//       where: { id: req?.query?.companyId },
//     });
//     return res.status(200).send(users);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };



// module.exports.UpdateCompany = async (req, res) => {
//   try {
//     const companyId = req.query.companyId;
//     const updatedData = req.body;
//     const updatedCompany = await CompanyModal.update(updatedData, { where: { id: companyId } });    
//     return res.status(200).send(updatedCompany);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// };


const db = require("../../models/index");
const ClientModel = db.clients;
const ClientOfficialModel = db.clientOfficials;
const CompanyModel = db.company;
const UserModel = db.users;
const bcrypt = require("bcryptjs")
const { sendEmail } = require("../../helpers/send-email");
const { generateRandomPassword } = require('../../helpers/generate-user-password');
const { sendClientEmail } = require("../../helpers/send-email-client");

module.exports.createClient = async (req, res) => {
  try {
    const { body } = req;
    if(body.clientName){
      const clients = await ClientOfficialModel.create(body);
      body.firstName = body.clientName
      body.lastName = body.clientName
      body.email = body.Email

      const password = generateRandomPassword(10);
      body.password = bcrypt.hashSync(password, 8);
      body.roleId = "6"
      body.companyId = req.query.companyId
      const user = await UserModel.create(body);
      body.password = password
      await sendEmail(body);

      return res.status(200).send({ message: "Client Official has been Added" });
    }
    else{
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
    console.log('api hit bodu',body);
    await sendClientEmail(body);
      return res.status(200).send({ message: "Email sent to client" });
      
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.FetchClientAndOfficials = async (req, res) => {
  try {
    // Fetch Company along with its Clients and ClientOfficials in a single query
    let data = await CompanyModel.findOne({
      where: { id: req.query.companyId }, 
      attributes: ['id', 'name'], // Specify attributes to retrieve from CompanyModel
      include: [
        {
          model: ClientModel,
          include: [
            {
              model: ClientOfficialModel,
            }
          ]
        }
      ]
    });

    if (!data) {
      return res.status(404).json({ message: 'Company not found' });
    }

    return res.status(200).json({ data }); // Return data as JSON response
  } catch (error) {
    console.error("Error:", error); // Log any errors for debugging
    res.status(500).send({ message: error.message }); // Return error message as response
  }
}



module.exports.fetchCompany = async (req, res) => {
  try {
    const users = await CompanyModel.findOne({
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
