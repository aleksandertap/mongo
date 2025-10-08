const mongoose = require("mongoose");

const author = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  personalCode: {
    type: String,
    required: true,
  },
  contactData: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContactData",
  },
});

module.exports = mongoose.model("Author", author);
