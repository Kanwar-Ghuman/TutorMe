"use server"
import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "heyanantraj@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function SendEmail(
  toEmail
) {
  await transporter.sendMail({
    from: "noreply@tutorme.com",
    to: toEmail,
    subject: "Verify your email",
    html: `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #FFFFFF;
                color: #1E1E1E;
            }
            .container {
                width: 100%;
                margin: 0 auto;
                background-color: #FFFFFF;
            }
            .header {
                background-color: #3751FF;
                color: #FFFFFF;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .verification-code {
                font-size: 20px;
                font-weight: bold;
                color: #3751FF;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>PowerGrader</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Please verify your email address by entering the code below:</p>
                <p class="verification-code">Hello</p>
                <p>Thank you for using PowerGrader!</p>
            </div>
        </div>
    </body>
    </html>
    `,
  });
}
