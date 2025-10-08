const mongoose = require("mongoose")

const contactData = new mongoose.Schema({
    address:{
        required: true,
        type: String
    },
    phone : {
        required:true,
        type: String
    }
})

module.exports = mongoose.model("ContactData", contactData)