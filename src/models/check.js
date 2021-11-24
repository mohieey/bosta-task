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
  lastStatus: { type: Number },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  channels: {
    type: Object,
    default: {},
  },
  running: {
    type: Boolean,
    default: true,
  },
});

schema.virtual("pollRecords", {
  ref: "PollRecord",
  localField: "_id",
  foreignField: "check",
});

schema.methods.toJSON = function () {
  const check = this.toObject();
  check["pollRecords"] = this.pollRecords;
  return check;
};

module.exports = model("Check", schema);
