import * as sgMail from '@sendgrid/mail';

export default function SendEmail() {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'heyanantraj@gmail.com', // Change to your recipient
    from: 'heyanantraj@gmail.com', // Change to your verified sender
    subject: 'This is a simple message',
    text: 'which contains some text',
    html: '<strong>and some html</strong>',
  }
  sgMail.send(msg)
}
