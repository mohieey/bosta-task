const sgMail = require("@sendgrid/mail");
const { mailKey } = require("../../env");

sgMail.setApiKey(mailKey);

module.exports = sgMail;
