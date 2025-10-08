const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  content: {
    required: true,
    type: String,
  },
  article: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
});

module.exports = mongoose.model("Comment", comment);
