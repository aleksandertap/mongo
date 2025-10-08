const mongoose =require('mongoose')

const comment = new mongoose.Schema({
  date: {
    required: true,
    type: Date,
  },
  content: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Comment", comment);
