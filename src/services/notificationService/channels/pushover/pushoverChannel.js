const Pushover = require("node-pushover");

class PushoverChannel {
  constructor() {}

  checkIfTheCheckHasPushoverRegistered({ pushover }) {
    if (pushover[0]) return pushover;

    return null;
  }

  notify(message, channels) {
    const pushoverPairs = this.checkIfTheCheckHasPushoverRegistered(channels);
    if (!pushoverPairs) return;
    console.log("pushover notified");

    pushoverPairs.forEach((pair) => {
      const push = new Pushover({ token: pair.APPTOKEN, user: pair.USERKEY });

      push.send("Status Change", message, function (err, res) {
        if (err)
          return console.log(
            `pushover error for app with key ${pair.APPTOKEN}`
          );
      });
    });
  }
}

const pushoverChannel = new PushoverChannel();

module.exports = pushoverChannel;
