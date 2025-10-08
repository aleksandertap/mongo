const dotenv = require("dotenv");
dotenv.config();

const config = {
    port: process.env.PORT|| 3000,
    dbString: process.env.DB_STRING || "mongodb://localhost:27017",
};
module.exports = config;