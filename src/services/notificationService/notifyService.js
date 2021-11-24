const mailChannel = require("./channels/mail/mailChannel");
const webhookChannel = require("./channels/webhook/webhookChannel");

class NotifyService {
  constructor() {
    this.channels = [];
  }
  addChannel(channel) {
    this.channels.push(channel);
  }

  constructMessage(check, response, lastStatus) {
    const message = `your check status with id:${check.id} and name:${check.name} for the url:${check.url},
    has changed from ${lastStatus} to ${response.status}`;

    return message;
  }

  notify(check, response, lastStatus) {
    const message = this.constructMessage(check, response, lastStatus);
    this.channels.forEach((channel) => channel.notify(check.id, message));
  }
}

const notifyService = new NotifyService();
notifyService.addChannel(mailChannel);
notifyService.addChannel(webhookChannel);

module.exports = notifyService;
