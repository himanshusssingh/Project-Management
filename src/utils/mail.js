import Mailgen from "mailgen";
import nodemailer from "nodemailer";


// Wrap in an async IIFE so we can use await.
const sendEmail = async (options) => {

    // Configure mailgen by setting a theme and your product info
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            // Appears in header & footer of e-mails
            name: 'Task Manager',
            link: 'https://taskmanagelink.com/',
            // Optional product logo
            // logo: 'https://mailgen.js/img/logo.png'
        }
    });
    
    
    // Generate an HTML email with the provided contents
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    
    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    const emailHtml = mailGenerator.generate(options.mailgenContent);
    
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS
      }
    });
    

    try{
        await transporter.sendMail({
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual, // plain‑text body
        html: emailHtml, // HTML body
        });
    }
    catch (err){
        console.error("Email service failed siliently. Make sure that you have provided your MAILTRAP credentials in the .env file");
        console.error("Error: ", err);
    }
}



// Verification email templates
const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
    body: {
        name: username,
        intro: "Welcome to our App! we're excited to have you on board.",
        action: {
            instructions: "To verify your email please click on the following button.",
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Verify your account',
                link: verificationUrl,
            }
        },
        outro: "Need help, or have question? just reply to this email, we'd like to help,",
    }}
};


//forgot password emial templates
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset the password of your account",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#22BC66",
          text: "Reset password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail};