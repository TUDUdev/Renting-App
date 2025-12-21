//For importing properties data from backend
const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// GET all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().select('-description -detailedDescription');
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
