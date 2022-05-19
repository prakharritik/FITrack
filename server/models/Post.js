const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: "date",
    default: Date.now,
  },
  image: {
    public_id: "",
    url: "",
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = mongoose.model("post", Post);
