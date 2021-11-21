module.exports = class {
  constructor(status, responseTime, assertion) {
    this.status = status;
    this.responseTime = responseTime;
    this.date = Date.now();
    this.assertion = assertion || false;
  }
};
