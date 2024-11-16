"use server";

import { createTransport } from "nodemailer";

export async function sendEmail(to, subject, html) {
  const msg = {
    from: "fhstutorme@gmail.com",
    to,
    subject,
    html,
  };

  const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,

    auth: {
      user: "heyanantraj@gmail.com",
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail(msg);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
