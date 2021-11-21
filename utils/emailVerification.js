const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");

const { mailKey } = require("../env");

//A table for codes and usernames associated with each code
const codes = {};

const generateCode = (username) => {
  const code = crypto.randomBytes(20).toString("hex");
  codes[code] = username;

  return code;
};

const getUsernameToVerify = (code) => codes[code];

const deleteCode = (code) => delete codes[code];

const sendVerificationCode = async (username, email, code) => {
  sgMail.setApiKey(mailKey);
  const msg = {
    to: `${email}`, // Change to your recipient
    from: "abomohieyem@gmail.com", // Change to your verified sender
    subject: "Verify Your Email",
    text: "Follow that link to verify your email",
    html: `<a>https://localhost:3000/api/verify/${code}</a>`,
  };
  await sgMail.send(msg);
  console.log(`Message sent successfully to ${email}`);
};

module.exports = {
  generateCode,
  getUsernameToVerify,
  deleteCode,
  sendVerificationCode,
};
