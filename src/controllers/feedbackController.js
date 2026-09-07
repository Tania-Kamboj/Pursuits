const nodemailer = require('nodemailer');

exports.sendFeedback = async (req, res) => {
  const { userEmail, userName, type, message } = req.body;

  // Apna email setup karo (Gmail ke liye App Password use karna)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL, // .env me apni email daalo
      pass: process.env.ADMIN_EMAIL_PASS // .env me app password daalo
    }
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL, // Admin ko hi bhejna hai
    subject: `New Claritii Feedback: ${type}`,
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
    console.error('❌ Nodemailer Error Details:', error.response); // Exact Gmail error yahan dikhega
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};