const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const User = require("../models/user");
const { salt, jwtPrivateKey } = require("../env");

const users = {};

const addUser = (username, password, email) => {
  let hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  const newUser = new User(username, hashedPassword, email);

  users[username] = newUser;

  return generateJWT({ username: newUser.username, email: newUser.email });
};

const getUser = (username) => {
  return users[username];
};

const generateJWT = (user) => {
  const token = jwt.sign(user, jwtPrivateKey);
  return token;
};

const verifyUser = (username) => {
  users[username].isVerified = true;
  console.log(users[username]);
};

// console.log(addUser("mohiey", "ifhd", "mohhiey@gmail.com"));
// console.log(addUser("df", "ifhd", "mohhiey@gmail.com"));
// console.log(addUser("mohdfdfiey", "ifhd", "mohhiey@gmail.com"));
// console.log(users);

module.exports = { addUser, getUser, verifyUser };
