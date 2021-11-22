const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const User = require("../models/user");
const { salt, jwtPrivateKey } = require("../env");

const addUser = (username, password, email) => {
  password = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  const newUser = new User({ username, password, email });
  newUser.save();

  return generateJWT({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  });
};

const getUser = async (username) => {
  return await User.findOne({ username: username });
};

const generateJWT = (user) => {
  const token = jwt.sign(user, jwtPrivateKey);
  return token;
};

const verifyUser = async (username) => {
  const userToVerify = await User.findOneAndUpdate(
    { username: username },
    { isVerified: true }
  );
};

module.exports = { addUser, getUser, verifyUser };
