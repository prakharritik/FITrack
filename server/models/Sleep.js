const mongoose = require("mongoose");

const Sleep = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: "date",
    default: Date.now,
  },
  duration: {
    type: "Number",
    required: true,
  },
});

module.exports = mongoose.model("sleep", Sleep);
