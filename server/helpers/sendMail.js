import nodemailer from 'nodemailer';

export default (data) => {
  const { account, email, amount, oldbalance, newbalance, Transactiontype } = data;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'khord4eng@gmail.com', // generated ethereal user
      pass: 'kore@123', // generated ethereal password
    },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    }
  });

  // start sending mails
  const mailOptions = {
      from: 'Banka  <foobar@gmail.com>',
        to: `${email}`,
        subject: `${Transactiontype} alert`,
        text: 'Hello ✔',
        html: `<p>AccountNumber ${account}</p>
        <p>TransactionType ${Transactiontype}</p>
                <p>amount:  ${amount}</p>
                 <p>oldbalance:  ${oldbalance}</p>
                 <p>newbalance:  ${newbalance}</p>`,
  }

    transporter.sendMail(mailOptions, (error, info) => {
 if(error) {
            console.log(error);
        }else {
            console.log(`Message sent:  ${info.response}`)
        }
  });


  }