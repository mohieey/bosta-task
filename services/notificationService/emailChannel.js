const Check = require("../../models/check");
const mail = require("../servicesInit/sgMail")
const fromMail = require("../../env")

module.exports =class  {
    constructor(mail) {
      this.mail = mail;
    }
    constructMSG(channel) {
      const msg = {
        to: `${email}`, // Change to your recipient
        from: fromMail, // Change to your verified sender
        subject: "Verify Your Email",
        text: "Follow that link to verify your email",
        html: `<a>https://localhost:3000/api/verify/${code}</a>`,
      };
    }
    notify(check, response) {
        const msg;
      this.channels.forEach(channel.notify(msg));
    }
  }