const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.useremail,
    pass: process.env.userpass,
  },
});

const sendEmail = async (name, email, token) => {
  const mailConfigurations = {
    from: process.env.useremail,

    to: email,

    subject: "Email Verification",

    text: `Hi! ${name},
         Thank you for joining our fitness community. Verify your email to get started.
         Please follow the given link to verify your email
         http://localhost:3000/verify/${token} 
         Thanks`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
  });
};

module.exports = sendEmail;
