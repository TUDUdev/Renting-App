const { admin, db } = require("./authen");
const { createUser, getUser } = require("../models/User"); // your Firebase User helper

// SIGNUP CONTROLLER
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  try {
    // Check if user already exists in Firebase Auth
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
      return res.status(400).json({ message: "User already exists" });
    } catch (err) {
      // User does not exist, continue to create
    }

    // Create user in Firebase Auth
    const newUser = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Save user in Firestore using helper
    const userData = await createUser({
      uid: newUser.uid,
      name: newUser.displayName,
      email: newUser.email,
    });

    res.status(201).json({ message: "Signup successful", user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// LOGIN CONTROLLER
const login = async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID token is required" });
  }

  try {
    // Verify the ID token from frontend Firebase Auth
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get user from Firestore
    const user = await getUser(uid);

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid ID token", error: error.message });
  }
};

module.exports = { register, login };
