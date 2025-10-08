const mongoose = require("mongoose");

const article = new mongoose.Schema({
  header: { type: String, required: true },
  content: { type: String, required: true },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = mongoose.model("Article", article);
