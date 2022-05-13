const mongoose = require("mongoose");

const Calorie = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: "date",
    required: true,
  },
  count: {
    type: "Number",
    required: true,
  },
});

module.exports = mongoose.model("calorie", Calorie);
