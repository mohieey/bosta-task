module.exports = class {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.isVerified = false;
  }
};
