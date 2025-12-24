// User.js
const { db } = require('./authen');

/**
 * Create a new user in Firestore
 * @param {Object} userData - { uid, name, email, password?, phone? }
 * @returns {Object} - Created user data
 */
const createUser = async ({ uid, name, email, password, phone = null }) => {
  const user = {
    uid,
    name,
    email,
    phone,
    password: password || null, // Usually passwords are handled by Firebase Auth
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.collection('users').doc(uid).set(user);
  return user;
};

/**
 * Get a user by UID
 * @param {string} uid
 * @returns {Object|null}
 */
const getUser = async (uid) => {
  const doc = await db.collection('users').doc(uid).get();
  return doc.exists ? doc.data() : null;
};

/**
 * Update a user by UID
 * @param {string} uid
 * @param {Object} updates
 * @returns {Object} - Updated user data
 */
const updateUser = async (uid, updates) => {
  updates.updatedAt = new Date();
  await db.collection('users').doc(uid).update(updates);
  const doc = await db.collection('users').doc(uid).get();
  return doc.data();
};

module.exports = { createUser, getUser, updateUser };
