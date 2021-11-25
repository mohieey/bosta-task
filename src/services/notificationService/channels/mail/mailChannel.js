const { fromMail } = require("../../../../env");
const mailAgent = require("../../../servicesInit/sgMail");

class MailChannel {
  constructor(mailAgent) {
    this.mailAgent = mailAgent;
  }

  checkIfTheCheckHasMailsRegistered({ mail }) {
    if (mail[0]) return mail;

    return null;
  }

  notify(message, channels) {
    const mails = this.checkIfTheCheckHasMailsRegistered(channels);
    if (!mails) return;
    console.log("Mail Sent");
    mails.forEach((mail) => {
      const msg = {
        to: `${mail}`, // Change to your recipient
        from: fromMail, // Change to your verified sender
        subject: "Status Changed",
        text: message,
      };
      this.mailAgent
        .send(msg)
        .catch(() => console.log("Failed to send notification mail"));
    });
  }
}

const mailChannel = new MailChannel(mailAgent);

module.exports = mailChannel;
