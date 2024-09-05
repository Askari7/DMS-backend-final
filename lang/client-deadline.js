module.exports.clientDeadline = (body) => {
    // Determine the warning message based on the days left
    let warningMessage = '';
    let warningColor = '#ffcc00'; // Default color

    if (body.daysLeft === 0) {
        warningMessage = 'The deadline has reached. Immediate action is required!';
        warningColor = '#ff6b6b'; // Red color for urgency
    } else if (body.daysLeft === 1) {
        warningMessage = 'The deadline is in 1 day. Please review the document as soon as possible.';
        warningColor = '#ff8800'; // Orange color for high urgency
    } else if (body.daysLeft === 2) {
        warningMessage = 'The deadline is in 2 days. Please ensure the document is reviewed.';
        warningColor = '#ffcc00'; // Yellow color for moderate urgency
    } else if (body.daysLeft === 3) {
        warningMessage = 'The deadline is in 3 days. Please plan to review the document.';
        warningColor = '#ffd700'; // Gold color for early warning
    } else {
        warningMessage = `The deadline is in ${body.daysLeft} days.`;
        warningColor = '#bbbbbb'; // Default color for general notification
    }

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
  
      <h1 style="color: #ffffff;">Client Approval Deadline Notification</h1>
        <p style="color: #bbbbbb;">Hello ${body?.email},</p>
        <p style="color: ${warningColor};">${warningMessage}</p>
        
        <p style="color: #bbbbbb;">Please review the document titled "${body?.title}" and take the necessary actions. You can view the document by clicking on the link below:</p>
        <p><a href="${body?.url}" style="color: #1e90ff;">View Document</a></p>

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
