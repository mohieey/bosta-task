const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

schema.virtual("checks", {
  ref: "Check",
  localField: "_id",
  foreignField: "user",
});

module.exports = model("User", schema);
