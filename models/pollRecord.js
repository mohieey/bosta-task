const { Schema, model } = require("mongoose");

const schema = new Schema({
  status: {
    type: Number,
    required: true,
  },
  statusText: { type: String, required: true },
  responseTime: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  assertion: {
    type: Boolean,
    default: false,
  },
  check: { type: Schema.Types.ObjectId, required: true, ref: "Check" },
});

module.exports = model("PollRecord", schema);
