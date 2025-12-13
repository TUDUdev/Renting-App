const User = require("../models/User")
const bcrypt = require("bcryptjs");

// SIGNUP CONTROLLER
exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.json({ message: "User already exists" });

  const hashPass = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashPass });

  res.json({ message: "Signup successful" });
};

// LOGIN CONTROLLER
exports.Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: "Incorrect password" });

  user.password = undefined;

  res.json({ message: "Login successful", user });
};