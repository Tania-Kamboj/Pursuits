const nodemailer = require('nodemailer');

exports.sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log(' New Contact Message:', { name, email, subject });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ADMIN_EMAIL,       
      pass: process.env.ADMIN_EMAIL_PASS   
    }
  });

  const mailOptions = {
    from: `"Pursuits Contact" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.ADMIN_EMAIL, 
    subject: `New Contact: ${subject} from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
        <h2 style="color: #4648d4;">New Contact Message on Pursuits</h2>
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4648d4; margin: 10px 0; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      </div>
    `
  };

  try {
    console.log('Sending contact email...');
    await transporter.sendMail(mailOptions);
    console.log(' Contact email sent successfully!');
    res.status(200).json({ success: true, message: 'Message sent to admin' });
  } catch (error) {
    console.error(' Contact Email Error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};