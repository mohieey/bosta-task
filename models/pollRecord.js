module.exports = class {
  constructor(status, responseTime) {
    this.status = status;
    this.responseTime = responseTime;
    this.date = Date.now();
  }
};
