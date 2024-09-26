const sendEmail = async (body) => {
  try {
    // Create a nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT, // Your SMTP server port
      secure: true, // Set to true if using SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    console.log(
    //   template(),
      body,
      process.env.SMTP_HOST,
      process.env.SMTP_PORT,
      process.env.SMTP_USER,
      process.env.SMTP_PASSWORD
    );
    // Setup email data
    console.log(body, "body");
    const mailOptions = {
      from: "salar@gmail.com",
      to: "askariabbaas135@gmail.com",
      subject: "Document Deadline Notification",
      html: documentDeadline(body),
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });

    return;
  } catch (error) {
    console.log(error, "error");
    return;
  }
};


const sendEmailToClient = async (body) => {
    try {
      // Create a nodemailer transporter using SMTP
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT, // Your SMTP server port
        secure: true, // Set to true if using SSL/TLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
  
      console.log(
      //   template(),
        body,
        process.env.SMTP_HOST,
        process.env.SMTP_PORT,
        process.env.SMTP_USER,
        process.env.SMTP_PASSWORD
      );
      // Setup email data
      console.log(body, "body");
      const mailOptions = {
        from: "salar@gmail.com",
        to: "askariabbaas135@gmail.com",
        subject: "Document Deadline Notification",
        html: clientDeadline(body),
      };
  
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
  
      return;
    } catch (error) {
      console.log(error, "error");
      return;
    }
  };



const cron = require('node-cron');
const { Op, where } = require('sequelize');
const db = require("../models/index");
const MDRModel = db.master_document_registers;

const DocumentModel = db.documents;
const ProjectModel = db.projects;
const ClientOfficialModel = db.clientOfficials;

const nodemailer = require("nodemailer");
const EstablishmentModel = db.establishments;
const UserModel = db.users; // Assuming your user model is named 'users'
const { documentDeadline } = require("../lang/document-deadline");
const { clientDeadline } = require('../lang/client-deadline');


cron.schedule('* * * * *', async () => { // Runs every day at 23:59
  console.log('Checking deadlines...');

  try {
    const now = new Date();
    
    // Calculate dates for comparison
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day from now
    const twoDaysFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 2 days from now

    // Query to find documents where expectedEndedDate is within 2 days, 1 day, or has passed
    const documents = await DocumentModel.findAll({
      where: {
        expectedEndedDate: {
          [Op.or]: [
            { [Op.lte]: now }, // Already passed
            { [Op.between]: [now, oneDayFromNow] }, // Within 1 day
            { [Op.between]: [now, twoDaysFromNow] }, // Within 2 days
          ]
        }
      }
    });

    for (const document of documents) {
      // Find the establishment with the same docName as the document's title, and the latest version
      const establishment = await EstablishmentModel.findOne({
        where: {
          docName: document.title,
          version: {
            [Op.eq]: db.sequelize.literal(`(
              SELECT MAX(version) FROM fms.establishments AS e2 
              WHERE e2.docName = establishments.docName
            )`)
          }
        }
      });

      const mdrCode = establishment.masterDocumentCode
      const mdrCompletion = await MDRModel.findOne({
        where: { mdrCode }
      });

      if(mdrCompletion.status == "Completed"){
        const owner = await UserModel.findOne({
            where: {
              roleId:1,
              companyId:mdrCompletion.companyId 
            }
          });
          await sendEmail({
            email: owner.email,
            message: `MDR '${mdrCompletion.title}' has been completed and all documents have been sent to client.`,
          });
        const projectClient = await ProjectModel.findOne({where:
            {
                id:mdrCompletion.projectId,
                code:mdrCompletion.projectCode
            }
        })

        const client = projectClient.clientId

        const clientOfficials = await ClientOfficialModel.findAll({where:
            {
                companyId:client
            }
        })
        console.log(establishment.clientStatus,establishment.sendToClient,'options');
        
        if(establishment.clientStatus == null && establishment.sendToClient == true){
            for (const user of clientOfficials) {

                const rn = establishment.updatedAt;
                const rnDate = new Date(now.getTime())
                const update_rn = new Date(rn.getTime() + 72 * 60 * 60 * 1000);
                if(update_rn>rnDate){
                    await sendEmailToClient({
                        email: user.Email,
                        title:document.title,
                        daysLeft:0,
                        message: `${user.clientName}, Your status has not been updated for document ${document.title}.`,
                    });
                }
                if(update_rn==rnDate){
                    establishment.clientStatus == "Approve"
                }

            }
        }
        for (const user of clientOfficials) {
                await sendEmail({
                    email: user.Email,
                    message: `MDR '${mdrCompletion.title}' has been completed and all documents have been sent to you.`,
                });
                }
      }


      if (establishment) {
        // Check reviewerStatus and approverStatus
        const reviewerStatusArray = establishment.reviewerStatus.split(',');
        const reviewerIdsArray = establishment.reviewerId.split(',');
        const approverStatusArray = establishment.approverStatus.split(',');
        const approverIdsArray = establishment.approverId.split(',');

        const pendingReviewIds = reviewerIdsArray.filter((_, index) => reviewerStatusArray[index] === '0');
        const pendingApprovalIds = approverIdsArray.filter((_, index) => approverStatusArray[index] === '0');

        const allPendingReviewerIds = pendingReviewIds;
        const allPendingApproverIds = pendingApprovalIds;

        console.log(allPendingApproverIds);
        console.log(allPendingReviewerIds);
        
        

        if (allPendingReviewerIds.length > 0) {
          // Fetch users from UserModel
          const reviewers = await UserModel.findAll({
            where: {
              id: {
                [Op.in]: allPendingReviewerIds
              }
            }
          });

          // Send email to each user
          for (const user of reviewers) {
            if (document.expectedEndedDate <= now) {
                await sendEmail({
                    email: user.email,
                    daysLeft:0,
                    title:document.title,
                    message: `Document '${document.title}' has pending review and your deadline has passed.`,
                  });
              } else if (document.expectedEndedDate <= oneDayFromNow) {
                await sendEmail({
                    email: user.email,
                    daysLeft:1,
                    title:document.title,

                    message: `Document '${document.title}' has pending review and your deadline is within 1 day.`,
                  });
              } else if (document.expectedEndedDate <= twoDaysFromNow) {
                await sendEmail({
                    email: user.email,
                    daysLeft:2,
                    title:document.title,

                    message: `Document '${document.title}' has pending review and your deadline is within 2 days.`,
                  });
              }
          }
        }


        if (allPendingApproverIds.length > 0) {
            // Fetch users from UserModel
            const approvers = await UserModel.findAll({
              where: {
                id: {
                  [Op.in]: allPendingApproverIds
                }
              }
            });
  
            // Send email to each user
            for (const user of approvers) {
                if (document.expectedEndedDate <= now) {
                    await sendEmail({
                        email: user.email,
                        daysLeft:0,
                        title:document.title,

                        message: `Document '${document.title}' has pending approval and your deadline has passed.`,
                      });
                  } else if (document.expectedEndedDate <= oneDayFromNow) {
                    await sendEmail({
                        email: user.email,
                        daysLeft:1,
                        title:document.title,

                        message: `Document '${document.title}' has pending approval and your deadline is within 1 day.`,
                      });
                  } else if (document.expectedEndedDate <= twoDaysFromNow) {
                    await sendEmail({
                        email: user.email,
                        daysLeft:2,
                        title:document.title,

                        message: `Document '${document.title}' has pending approval and your deadline is within 2 days.`,
                      });
                  }
            }
          }
      }

      // Handle document deadlines
      

      // Update the notified field or perform other necessary updates
      document.notified = true;
      await document.save();
    }
  } catch (error) {
    console.log(error, "error");
  }
});
