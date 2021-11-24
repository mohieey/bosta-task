const crypto = require("crypto");

const User = require("../models/user");
const hashPassword = require("../utils/hashPassword");
const tokenGenerator = require("../utils/tokenGenerator");

const addUser = (username, password, email) => {
  password = hashPassword(password);

  const newUser = new User({ username, password, email });
  newUser.save();

  return tokenGenerator({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    isVerified: newUser.isVerified,
  });
};

const getUser = async (username) => {
  return await User.findOne({ username: username });
};

const verifyUser = async (username) => {
  const userToVerify = await User.findOneAndUpdate(
    { username: username },
    { isVerified: true }
  );
};

module.exports = { addUser, getUser, verifyUser };
