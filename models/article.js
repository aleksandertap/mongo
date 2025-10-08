const mongoose = require("mongoose");

const article = new mongoose.Schema({
  header: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Article", article);
