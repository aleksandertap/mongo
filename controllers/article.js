const express = require("express");
const router = express.Router();
const Article = require("../models/article");

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
  const {id} = req.params;
  const updatedData = req.body;
    const options = { new: true };
  try {
    const result = await Article.findByIdAndUpdate(id, updatedData, options);

    res.send(result);


  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
