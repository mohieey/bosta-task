class WebhookChannel {
  constructor() {}

  checkIfTheCheckHasWebhookRegistered({ webhook }) {
    if (webhook[0]) return webhook;

    return null;
  }

  notify(message, channels) {
    const webhook = this.checkIfTheCheckHasWebhookRegistered(channels);
    if (!webhook) return;
    console.log("webhook notified");
    webhook.forEach((url) => {
      console.log(`posted to ${url}`, message);
    });
  }
}

const webhookChannel = new WebhookChannel();

module.exports = webhookChannel;
