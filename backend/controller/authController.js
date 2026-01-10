const { admin } = require("./authen");
const { createUser, getUser } = require("../models/User");

// SIGNUP (NO LOGIN TOKEN ISSUED)
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
      phoneNumber: `+91${phone}`,
    });

    await createUser({
      uid: userRecord.uid,
      name,
      email,
      phone,
    });

    return res.status(201).json({
      message: "Signup successful — please login",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// LOGIN (TOKEN VERIFIED ONLY)
const login = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID token required" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const user = await getUser(decoded.uid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { register, login };
