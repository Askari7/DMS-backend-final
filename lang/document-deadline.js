module.exports.documentDeadline = (body) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document Deadline Notification</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #1e1e1e; color: #ffffff; margin: 0; padding: 0;">
    
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #333; box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); border-radius: 5px; margin-top: 20px;">
        <h1 style="color: #ffffff;">Product Testing Notification</h1>
      <h1 style="color: #ffffff;">Document Deadline Notification</h1>
        <p style="color: #bbbbbb;">Hello ${body?.email},</p>
        <p style="color: #bbbbbb;">This is a reminder that the document titled "${body?.title}" has a deadline approaching.</p>
        
        ${body?.daysLeft === 0 
          ? `<p style="color: #ff6b6b;">The deadline has passed.</p>`
          : `<p style="color: #ffcc00;">The deadline is in ${body?.daysLeft} day(s).</p>`
        }
        <p style="color: #bbbbbb;">If you have any questions or need assistance, please feel free to contact our support team.</p>
        <p style="color: #bbbbbb;">Thank you for your attention to this matter.</p>
        <div style="margin-top: 20px; text-align: center; color: #777;">
          <p>Best Regards,<br>Your Company Team</p>
        </div>
      </div>
    
    </body>
    </html>
    `;
};
