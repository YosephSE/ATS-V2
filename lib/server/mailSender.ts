import nodemailer from "nodemailer";

export default async function sendPasswordEmail(toEmail: string, password: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "info.jpp.ats@gmail.com",
    to: toEmail,
    subject: "Your Login Credentials",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
        <h2 style="color: #4CAF50; text-align: center;">Welcome!</h2>
        <p style="font-size: 16px; color: #333333; text-align: center;">
          We are excited to have you on board. Here is your 6-digit password:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 36px; font-weight: bold; color: #4CAF50;">${password}</span>
        </div>
        <p style="font-size: 14px; color: #555555; text-align: center;">
          Please keep this password safe and secure. Don't forget to change your default password once you logged in.
        </p>
        <p style="font-size: 14px; color: #777777; text-align: center;">
          Best Regards,<br>Your Team
        </p>
      </div>
    `,
  });
}
