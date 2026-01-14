const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

// reusable function
const sendEmail = async (to,html,subject,text) => {
    const info = await transporter.sendMail({
        from: `"PasteBin" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: `${subject}`,
        text: `${text}`,
        html: `<b>${html}</b>`,
    });

    console.log("Message sent:", info.messageId);
};

module.exports = sendEmail;
