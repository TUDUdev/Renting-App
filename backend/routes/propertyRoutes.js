const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// GET all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().select("-description -detailedDescription");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new property (rent a house)
router.post("/rent", async (req, res) => {
  try {
    const { title, price, location, type } = req.body;
    if (!title || !price || !location || !type) {
      return res.status(400).json({ message: "Title, price, location, and type are required" });
    }

    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
