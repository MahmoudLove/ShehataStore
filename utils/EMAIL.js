import nodemailer from 'nodemailer';
export default async function sendEmail(details) {
  // 1) Create a transporter

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Shehata Pharmacy Store',
    to: details.email,
    subject: details.subject,
    text: details.text,
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
}
