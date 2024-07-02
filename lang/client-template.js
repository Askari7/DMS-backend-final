module.exports.clientTemplate = (body) => {
    console.log('bodyyyyyy',body);
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your document is ready!</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #1e1e1e; color: #ffffff; margin: 0; padding: 0;">
    
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #333; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); border-radius: 5px; margin-top: 20px;">
        <h1 style="color: #ffffff;">View Document</h1>
        <p style="color: #bbbbbb;">Dear ${body?.clientName},</p>
        <p style="color: #bbbbbb;">We are pleased to inform you that a company has created the document and you can view it. Here is the url:</p>
        <p style="color: #bbbbbb;">Email: ${body?.clientName} Password: ${body?.password}</p>

        <p style="color: #bbbbbb;">You can view the document by clicking on ${body?.mainUrl}</p>
        <p style="color: #bbbbbb;">If you have any questions or need assistance, please feel free to contact our support team at [Support Email or Phone Number].</p>
        <p style="color: #bbbbbb;">Thank you for choosing Novacon. We look forward to serving you!</p>
        <div style="margin-top: 20px; text-align: center; color: #777;">
          <p>Best Regards,<br>Novacon Team</p>
        </div>
      </div>
    
    </body>
    </html>
    `;
  };
//   <ul style="color: #bbbbbb;">
//   <li>Email: <strong>${body?.url}</strong></li>
// </ul>