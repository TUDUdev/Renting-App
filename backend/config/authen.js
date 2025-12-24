// authen.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Your Firebase service account JSON

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore database instance
const db = admin.firestore();

// Export both admin (for auth) and db (for Firestore)
module.exports = { admin, db };
