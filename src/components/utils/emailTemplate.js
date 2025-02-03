export const tutorConfirmationEmail = `<!DOCTYPE html>
<html>

<head>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
      margin: 0;
      font-family: Arial, sans-serif;
    }
    .container {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      color: black;
    }
    .line {
      align-items: center;
      text-align: center;
      gap: 5px;
      color: black;
    }
    .confirm {
      background-color: #FACC14;
      border-radius: 10px;
      padding: 10px 20px;
      border: 1px solid #333;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      color: black;
      display: block;
      margin: 20px auto;
    }
    .logo {
      text-align: center;
      color: black;
      font-size: 24px;
      font-weight: bold;
    }
    .logoStyle {
      color: #FACC14;
      padding-left: 5px;
    }
    .title {
      text-align: center;
      color: black;
    }
    .subtitle {
      font-weight: bold;
    }
    a:visited {
      color: inherit;
      text-decoration: none;
    }

    .content{
      text-align: center;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <p class="logo">NHS<span class="logoStyle">TutorMe</span></p>
      <h1 class="title">Tutor Confirmation</h1>
    </div>
    <div class="content">
      <p>Hello [name of tutor]</p>
      <p>These are the details of your tutoring session: </p>
      <div class="line">
        <p><span class="subtitle">Name Of Student: </span>  [name of student]</p>
      </div>
      <div class="line">
        <p><span class="subtitle">Subject:</span>  AP Physics</p>
      </div>
      <p>To confirm this tutoring session, please click <span><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">here</a></span></p>
      <p>Thank you for using TutorMe!</p>
    </div>
  </div>
</body>

</html>`;
export const confirmationEmailTemplate = (
  name,
  role,
  matchName,
  subject,
  confirmLink
) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-color: white;
      color: black;
      font-family: Arial, sans-serif;
    }
    .container {
      padding: 20px;
      max-width: 600px;
      margin: auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: white;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: black;
    }
    .logo .logoStyle {
      color: #FACC14;
      margin-right: 5px;
    }
    .content {
      line-height: 1.6;
    }
    .button {
      background-color: #FACC14;
      color: black;
      padding: 12px 24px;
      border-radius: 4px;
      text-decoration: none;
      display: inline-block;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #777;
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="logo">NHS<span class="logoStyle">TutorMe</span></p>
      <h2>Match Confirmation</h2>
    </div>
    <div class="content">
      <p>Hello ${name},</p>
      <p>You've been matched as a <strong>${role}</strong> for the following subject:</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Matched ${
        role === "tutor" ? "Student" : "Tutor"
      }:</strong> ${matchName}</p>
      <p>Please confirm this match by clicking the button below:</p>
      <a href="${confirmLink}" class="button">Confirm Match</a>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} TutorMe. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const tutorSubjectLine = "Tutor Me Confirmation";
export const studentSubjectLine = "Tutor Me Confirmation";
