// const brevo = require('@getbrevo/brevo');
import * as brevo from "@getbrevo/brevo"

export const SendEmail = () => {
  let defaultClient = brevo.ApiClient.instance;

  let apiKey = defaultClient.authentications['apiKey'];

  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "My {{params.subject}}";
  sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = { "name": "John", "email": "heyanantraj@gmail.com" };
  sendSmtpEmail.to = [
    { "email": "anant.raj@franklinsabers.org", "name": "Anant" }
  ];
  sendSmtpEmail.replyTo = { "email": "heyanantraj@gmail.com", "name": "heyanantraj" };
  sendSmtpEmail.headers = { "tutorme": "tutorme-1212" };
  sendSmtpEmail.params = { "parameter": "Test Email", "subject": "Hello world" };
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
}
