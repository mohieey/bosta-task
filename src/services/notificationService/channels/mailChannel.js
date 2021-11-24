const { fromMail } = require("../../../env");
const mailAgent = require("../../servicesInit/sgMail");

const {
  checkIfTheCheckHasMailsRegistered,
} = require("../../../database/checks");

class MailChannel {
  constructor(mailAgent) {
    this.mailAgent = mailAgent;
  }

  notify(checkId, message) {
    checkIfTheCheckHasMailsRegistered(checkId).then((check) => {
      if (!check) return;
      console.log(check);
      check.channels.mail.forEach((mail) => {
        const msg = {
          to: `${mail}`, // Change to your recipient
          from: fromMail, // Change to your verified sender
          subject: "Status Changed",
          text: message,
        };
        this.mailAgent.send(msg);
      });
    });
  }
}

const mailChannel = new MailChannel(mailAgent);

module.exports = mailChannel;
