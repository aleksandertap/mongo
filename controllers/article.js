const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const Comment = require("../models/comment");

router.post("/articles", async (req, res) => {
  const { header, content } = req.body;
  try {
    const newArticle = new Article({ header, content });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/articles", async (req, res) => {
  try {
    const data = await Article.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Article.findById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete(id);
    const data = await Article.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const options = { new: true };
  try {
    const result = await Article.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/articles/:id/comment", async (req, res) => {
  const id = req.params.id;
  const options = { new: true };

  try {
    const newComment = new Comment({
      date: new Date(),
      content: req.body.content,
      article: id,
    });

    const savedComment = await newComment.save();

    const result = await Article.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          comments: savedComment._id,
        },
      },
      options
    );

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message || error });
  }
});

router.get("/articles/:id/comment", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Article.findById(id).populate("comments");

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
