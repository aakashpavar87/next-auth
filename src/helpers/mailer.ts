import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: "maddison53@ethereal.email",
//       pass: "jn7jnAPss4f63QBp6D",
//     },
// });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_AUTH_USERNAME,
    pass: process.env.EMAIL_AUTH_PASSWORD
  }
});

const sendEmail = async ({email, emailType, userId}: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if(emailType === "Verify") {
      await User.findByIdAndUpdate(userId, {isVerifiedToken: hashedToken, isVerifiedExpiry: Date.now() + 3600000})
    } else if(emailType === "Reset") {
      await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000})
    }
    const htmlResponse = `
    <p> 
      <a href="${process.env.ENDPOINT_URI}/${emailType === "Verify"? 'verify-email': 'reset-password'}?token=${hashedToken}"> 
        Click Here 
      </a> to ${emailType === "Verify" ? "verify your password" : "rest your password"} or copy and paste below link in your browser <br /> ${process.env.ENDPOINT_URI}/${emailType === "Verify"? 'verify-email': 'reset-password'}?token=${hashedToken} 
    </p>`;
    const message = {
      from: "sender@server.com",
      to: email,
      subject: emailType === 'Verify' ? "Verify your Account" : "Reset your Password",
      text: "Plaintext version of the message",
      html: htmlResponse,
    };
    const info = await transporter.sendMail(message);
    return info;
  } catch (error:any) {
    console.log(error.message);
    
  }
}

export default sendEmail;