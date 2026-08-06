const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  let transporter;

  // If SMTP config is missing, use Ethereal for testing
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log('No SMTP configuration found. Generating Ethereal test account...');
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  const message = {
    from: process.env.EMAIL_FROM || 'StudyPulse AI <noreply@studypulse.ai>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML version
  };

  const info = await transporter.sendMail(message);

  console.log(`Message sent: ${info.messageId}`);
  
  // Log the preview URL for Ethereal
  // The ethereal domain might not always be in the messageId for dynamically generated test accounts,
  // so we check if testAccount is truthy or if host is ethereal
  if (transporter.options.host === 'smtp.ethereal.email') {
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  }
};

module.exports = sendEmail;
