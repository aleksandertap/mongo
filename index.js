const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.js");
const articleRouter = require("./controllers/article");
const commentRouter = require('./controllers/comment')
const authorRouter = require("./controllers/author")
const PORT = config.port;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', articleRouter);
app.use('/', commentRouter)
app.use("/", authorRouter)

async function startServer() {
  try {
    await mongoose.connect(config.dbString);
    console.log("Connected to MongoDB");

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    

    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
