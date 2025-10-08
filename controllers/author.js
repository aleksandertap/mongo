const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const ContactData = require("../models/contactData");

router.post("/author", async (req, res) => {
  const { firstName, lastName, personalCode, contact } = req.body;
  try {
    const contactData = new ContactData({
      address: contact.address,
      phone: contact.phone,
    });

    const savedContactData = await contactData.save();

    const author = new Author({
      firstName: firstName,
      lastName: lastName,
      personalCode: personalCode,
      contactData: savedContactData._id,
    });

    const authorToSave = await author.save();

    res.status(201).json(authorToSave);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/author", async (req, res) => {
  try {
    const data = await Author.find().populate("contactData");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/author/:id", async (req, res) => {
  try {
    const data = await Author.findById(req.params.id).populate("contactData");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/author/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Author.findByIdAndDelete(id);
    const data = await Author.find();
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/author/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const author = await Author.findById(id);
    const contactDataId = author?.contactData;

    const updatedContactData = {
      address: req.body.contact.address,
      phone: req.body.contact.phone,
    };

    await ContactData.findByIdAndUpdate(contactDataId, updatedContactData);

    const updatedAuthor = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      personalCode: req.body.personalCode,
      contactData: contactDataId,
    };

    const options = { new: true };

    const result = await Author.findByIdAndUpdate(
      id,
      updatedAuthor,
      options
    ).populate("contactData");

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
