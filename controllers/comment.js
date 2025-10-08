const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router.post("/comments", async (req, res) => {
  const data = new Comment({
    date: new Date(),
    content: req.body.content,
    article: req.body.article
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/comments", async (req, res) => {
  try {
    const data = await Comment.find().populate('article');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const data = await Comment.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/comments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Comment.findByIdAndDelete(id);
    const data = await Comment.find();
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/comments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Comment.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
