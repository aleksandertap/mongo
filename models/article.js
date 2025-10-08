const mongoose = require("mongoose");

const article = new mongoose.Schema({
  header: { type: String, required: true },
  content: { type: String, required: true },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  author: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  }
});

module.exports = mongoose.model("Article", article);
