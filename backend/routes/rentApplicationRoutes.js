//Apply for Rent by User
const express = require("express");
const router = express.Router();
const RentApplication = require("../models/RentApplication");
const mongoose = require("mongoose");

router.post("/apply", async (req, res) => {
  try {
    const { propertyId, name, email, phone, moveInDate, message } = req.body;

    // 1️⃣ Validate required fields
    if (!propertyId || !name || !email || !phone || !moveInDate) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // 2️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    // 3️⃣ Prevent duplicate application
    const existingApplication = await RentApplication.findOne({
      propertyId,
      email,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this property",
      });
    }

    // 4️⃣ Create application
    const application = await RentApplication.create({
      propertyId,
      name: name.trim(),
      email: email.toLowerCase(),
      phone,
      moveInDate,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Apply rent error:", error);

    // Handle duplicate index error (safety net)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate application detected",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while submitting application",
    });
  }
});

module.exports = router;