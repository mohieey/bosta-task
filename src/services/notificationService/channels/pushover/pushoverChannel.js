const Pushover = require("node-pushover");
const checkIfTheCheckHasPushoverRegistered = require("./checkIfTheCheckHasPushoverRegistered");

class PushoverChannel {
  constructor() {}

  notify(checkId, message) {
    checkIfTheCheckHasPushoverRegistered(checkId).then((check) => {
      if (!check) return;

      const push = new Pushover({
        token: check.pushover.APPTOKEN,
        user: check.pushover.USERKEY,
      });

      push.send("Status Change", message, function (err, res) {
        if (err) return console.log(err);
        console.log("pushover notified");
      });
    });
  }
}

const pushoverChannel = new PushoverChannel();

module.exports = pushoverChannel;
