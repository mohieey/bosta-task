const crypto = require("crypto");

module.exports = class {
  constructor({
    name,
    url,
    protocol,
    path,
    port,
    webhook,
    timeout,
    interval,
    threshold,
    authentication,
    httpHeaders,
    assert,
    tags,
    ignoreSSL,
  }) {
    this.id = crypto.randomBytes(20).toString("hex");
    this.name = name;
    this.url = url;
    this.protocol = protocol;
    this.path = path || "";
    this.port = port || "";
    this.webhook = webhook || "";
    this.timeout = timeout || 5000;
    this.interval = interval || 10 * 1000;
    this.threshold = threshold || 1;
    this.authentication = authentication || {};
    this.httpHeaders = httpHeaders || {};
    this.assert = assert || { statusCode: 200 };
    this.tags = tags || [];
    this.ignoreSSL = ignoreSSL;
    this.history = [];
  }
};
