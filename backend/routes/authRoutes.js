const express = require("express");
const { register, login } = require("../controller/authController"); // Firebase controllers

const router = express.Router();

// Signup route
router.post("/signup", register);

// Login route
router.post("/login", login);

module.exports = router;
