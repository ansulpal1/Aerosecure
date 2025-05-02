import nodemailer from 'nodemailer';

export const sendLoginDetailsEmail = async (toEmail, name, userId, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App password (not your actual Gmail password)
      },
    });

    const mailOptions = {
      from: `"Aerosecure Team" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Your Fire Officer Login Credentials',
      html: `
        <p>Dear ${name},</p>
        <p>You have been registered as a Fire Officer in the Aerosecure system.</p>
        <p><strong>User ID:</strong> ${userId}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please login and change your password after first login.</p>
        <p>Regards,<br>Aerosecure Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${toEmail}`);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};
