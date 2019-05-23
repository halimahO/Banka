import nodemailer from 'nodemailer';

export default (data, res) => {
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
        text: `${Transactiontype}`,
        html: `
 
        <body style="font-size: 15px;">
        <p style="background-color: #f0f0f0; padding: 20px">AccountNumber:  ${account}</p>
        <p style="padding: 20px">TransactionType:  ${Transactiontype}</p>
                <p  style="background-color: #f0f0f0; padding: 20px">amount:  ${amount}</p>
                 <p style="padding: 20px">oldbalance:  ${oldbalance}</p>
                 <p  style="background-color: #f0f0f0; padding: 20px">newbalance:  ${newbalance}</p>
                 <p style="padding: 20px;text-align: center"> copyright banka 2019</p> 
            </body>`,
  }

    transporter.sendMail(mailOptions, (error, info) => {
 if(error) {
            console.log(error);
        }else {
            console.log(`Message sent:  ${info.response}`);
             res.status(500).json({
              status: 500,
              msg: 'failed to send confirmation mail ',
            });
        }
  });


  }