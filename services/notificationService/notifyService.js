const mailChannel = require("./channels/mailChannel");

class NotifyService {
  constructor() {
    this.channels = [];
  }
  addChannel(channel) {
    this.channels.push(channel);
  }

  constructMessage(check, response, lastStatus) {
    const message = `you check status with id:${check.id} and name:${check.name} for the url:${check.url},
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

module.exports = notifyService;
