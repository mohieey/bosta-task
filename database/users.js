const jwt = require("jsonwebtoken");
const Joi = require("joi");

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

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(25).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

// console.log(addUser("mohiey", "ifhd", "mohhiey@gmail.com"));
// console.log(addUser("df", "ifhd", "mohhiey@gmail.com"));
// console.log(addUser("mohdfdfiey", "ifhd", "mohhiey@gmail.com"));
// console.log(users);

module.exports = { addUser, getUser, validateUser };
