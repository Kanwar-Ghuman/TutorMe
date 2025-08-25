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

// Enhanced email template for tutor matching confirmations
export const enhancedConfirmationEmailTemplate = (
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
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 0;
      background-color: #f5f5f5;
    }
    .email-container {
      background-color: white;
      margin: 20px auto;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #FACC14 0%, #F59E0B 100%);
      color: black;
      padding: 30px 20px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .logo .highlight {
      background-color: black;
      color: #FACC14;
      padding: 4px 8px;
      border-radius: 6px;
      margin-left: 4px;
    }
    .header-subtitle {
      font-size: 18px;
      opacity: 0.9;
      margin: 0;
    }
    .content {
      padding: 30px;
    }
    .match-card {
      background-color: #f8f9fa;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .match-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;
      padding: 10px;
      background-color: white;
      border-radius: 6px;
      border-left: 4px solid #FACC14;
    }
    .match-info .label {
      font-weight: bold;
      color: #666;
    }
    .match-info .value {
      color: #333;
      font-weight: 500;
    }
    .confirm-button {
      display: inline-block;
      background: linear-gradient(135deg, #FACC14 0%, #F59E0B 100%);
      color: black;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      font-size: 16px;
      margin: 20px 0;
      transition: transform 0.2s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .confirm-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    .role-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .role-student {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    .role-tutor {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
      border-top: 1px solid #e9ecef;
    }
    .urgent-notice {
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 6px;
      padding: 15px;
      margin: 20px 0;
      text-align: center;
    }
    .urgent-notice strong {
      color: #856404;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">
        NHS<span class="highlight">TutorMe</span>
      </div>
      <p class="header-subtitle">📚 \${role === 'tutor' ? 'New Student Match!' : 'Your Tutor is Ready!'}</p>
    </div>
    
    <div class="content">
      <h2>Hello \${name}! 👋</h2>
      
      <p>Great news! We've found \${role === 'tutor' ? 'a student who needs your help' : 'the perfect tutor for you'}.</p>
      
      <div class="match-card">
        <h3>🎯 Match Details</h3>
        <div class="role-badge \${role === 'tutor' ? 'role-tutor' : 'role-student'}">
          You are the \${role}
        </div>
        
        <div class="match-info">
          <span class="label">\${role === 'tutor' ? '👨‍🎓 Student:' : '👨‍🏫 Tutor:'}</span>
          <span class="value">\${matchName}</span>
        </div>
        
        <div class="match-info">
          <span class="label">📖 Subject:</span>
          <span class="value">\${subject}</span>
        </div>
        
        <div class="match-info">
          <span class="label">📅 Match Date:</span>
          <span class="value">\${new Date().toLocaleDateString()}</span>
        </div>
      </div>

      \${confirmLink ? \`
        <div class="urgent-notice">
          <strong>⏰ Action Required:</strong> Please confirm this match within 24 hours
        </div>
        
        <div style="text-align: center;">
          <a href="\${confirmLink}" class="confirm-button">
            ✅ Confirm This Match
          </a>
        </div>
        
        <p style="text-align: center; color: #666; font-size: 14px;">
          <strong>Important:</strong> Both \${role === 'tutor' ? 'student and tutor' : 'tutor and student'} must confirm before the match is finalized.
        </p>
      \` : \`
        <div style="text-align: center; padding: 20px; background-color: #d4edda; border-radius: 8px; color: #155724;">
          <h3>🎉 Match Confirmed!</h3>
          <p>This tutoring session has been approved and is ready to begin.</p>
        </div>
      \`}
      
      <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <h4>📋 Next Steps:</h4>
        <ul style="text-align: left; margin: 10px 0;">
          \${confirmLink ? 
            \`<li>Click the confirmation button above</li>
             <li>Wait for the other party to confirm</li>
             <li>You'll receive another email when both parties confirm</li>\` :
            \`<li>Contact information will be shared separately</li>
             <li>Schedule your first session</li>
             <li>Start learning together!</li>\`
          }
        </ul>
      </div>
      
      <p style="margin-top: 30px;">
        Questions? Reply to this email or contact our support team.
      </p>
    </div>
    
    <div class="footer">
      <p>&copy; \${new Date().getFullYear()} NHS TutorMe. All rights reserved.</p>
      <p>This email was sent to confirm your tutoring match.</p>
    </div>
  </div>
</body>
</html>
`;
