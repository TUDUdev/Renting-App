const express = require("express");
const router = express.Router();
const RentApplication = require("../models/RentApplication");

router.post("/apply", async (req, res) => {
  try {
    const application = new RentApplication(req.body);
    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
});

module.exports = router;
