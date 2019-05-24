import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class Email {
  static transport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });
  }

  static sendMail(mail) {
    Email.transport().sendMail(mail, (err) => {
      if (err) {
        console.log(err);
        return err;
      }
      console.log('success');
      return null;
    });
  }

  static newuser(name, email) {
    return {
      from: '"Banka 💳" <lordsylharx@gmail.com>',
      to: email,
      subject: 'Welcome to Banka',
      html: `
      <div style=" border: 2px solid #002060;
        padding: 10px;
        ">
        
      <div style="font-family:georgia">
            <h1 style="background-color:#002060;color:white;padding-left:20px;font-family: 'Srisakdi', cursive;">Banka </h1>
            <p style="padding-bottom:10px;padding-left:15px;">Dear ${name},</p> 
              <p style="padding-left:15px;">We are very glad you chose us as your financial institution and hope you will take advantage of our wide variety of savings, investment and loan products, all designed to meet your specific needs.</p>
               <p style="padding-left:15px;">  We are committed to providing our customers with the highest level of service and the most innovative banking products possible.</p>
      
       <p style="padding-left:15px;">Please do not hesitate to contact us, should you have any questions. We will contact you in the very near future to ensure you are completely satisfied with the services you have received thus far.
      </p>
          
              <p style="padding-bottom:2px;padding-left:15px;">Respectfully,</p> 
              <b style="padding-bottom:0px;padding-left:15px;">Mike Lewis</b><br/> 
              <b style="padding-bottom:0px;padding-left:15px;">C.E.O</b> 
      
           
      
       <div style="text-align:center; margin:5%;">
         
       <a style=" margin: 20px;
          padding: 7px;
          background: rgba(23, 37, 85, 0.986);
          color: #fff;
                 text-decoration:none;
          font-size: 15px;
        " href="https://halimaho.github.io/Banka/UI/">Start Banking</a>  </div> 
        </div>
      </div>
        
      `,
    };
  }
}

export default Email;
