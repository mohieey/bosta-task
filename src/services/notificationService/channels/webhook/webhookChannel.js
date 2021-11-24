const checkIfTheCheckHasWebhookRegistered = require("./checkIfTheCheckHasWebhookRegistered");

class WebhookChannel {
  constructor() {}

  notify(checkId, message) {
    checkIfTheCheckHasWebhookRegistered(checkId).then((check) => {
      if (!check) return;
      console.log("webhook notified");
      //Sending Post Request to the webhook..........
    });
  }
}

const webhookChannel = new WebhookChannel();

module.exports = webhookChannel;
