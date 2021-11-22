const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  protocol: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: "",
  },
  port: {
    type: String,
    default: "",
  },
  webhook: {
    type: String,
    default: "",
  },
  timeout: {
    type: Number,
    default: 5000,
  },
  interval: {
    type: Number,
    default: 10 * 60 * 1000,
  },
  threshold: {
    type: Number,
    default: 1,
  },
  authentication: {
    type: Object,
    default: {},
  },
  httpHeaders: {
    type: Object,
    default: {},
  },
  assert: {
    type: Object,
    default: { statusCode: 200 },
  },
  tags: {
    type: [String],
    default: [],
  },
  ignoreSSL: {
    type: Boolean,
    default: false,
  },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

schema.virtual("pollRecords", {
  ref: "PollRecord",
  localField: "_id",
  foreignField: "check",
});

module.exports = model("Check", schema);
