const mongoose = require("mongoose");

const Walk = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: "date",
    required: true,
  },
  distance: {
    type: "Number",
    required: true,
  },
});

module.exports = mongoose.model("walk", Walk);
