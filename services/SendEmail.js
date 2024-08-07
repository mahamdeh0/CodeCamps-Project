let nodemailer = require ('nodemailer');

async function sendEmail(recipient, subject, body) {
    
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ' ', 
      pass: ' ' 
    }
  });

  let info = await transporter.sendMail({
    from: '"Your Name" ', 
    to: recipient, 
    subject: subject, 
    text: body, 
    html: `<b>${body}</b>` 
  });

}

module.exports= { sendEmail};
