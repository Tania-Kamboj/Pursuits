const nodemailer = require('nodemailer');

exports.sendFeedback = async (req, res) => {
  const { userEmail, userName, type, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL, 
      pass: process.env.ADMIN_EMAIL_PASS 
    }
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL, 
    subject: `New Pursuits Feedback: ${type}`,
    html: `
      <h2>New Feedback Received</h2>
      <p><strong>From:</strong> ${userName} (${userEmail})</p>
      <p><strong>Category:</strong> ${type}</p>
      <p><strong>Message:</strong></p>
      <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Feedback sent to admin' });
  } catch (error) {
    console.error(' Nodemailer Error Details:', error.response); 
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};