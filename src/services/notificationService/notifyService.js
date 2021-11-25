const mailChannel = require("./channels/mail/mailChannel");
const webhookChannel = require("./channels/webhook/webhookChannel");
const pushoverChannel = require("./channels/pushover/pushoverChannel");
const Check = require("../../models/check");

class NotifyService {
  constructor() {
    this.channels = [];
  }
  addChannel(channel) {
    this.channels.push(channel);
  }

  async getCheckChannels(checkId) {
    const channels = await Check.findById(checkId).select("channels");
    return channels;
  }

  constructMessage(check, response, lastStatus) {
    const message = `your check status with id:${check.id} and name:${check.name} for the url:${check.url},
    has changed from ${lastStatus} to ${response.status}`;

    return message;
  }

  async notify(check, response, lastStatus) {
    const message = this.constructMessage(check, response, lastStatus);
    const { channels: channelsForCheck } = await this.getCheckChannels(
      check.id
    );
    this.channels.forEach((channel) =>
      channel.notify(message, channelsForCheck)
    );
  }
}

const notifyService = new NotifyService();
notifyService.addChannel(mailChannel);
notifyService.addChannel(webhookChannel);
notifyService.addChannel(pushoverChannel);

module.exports = notifyService;
