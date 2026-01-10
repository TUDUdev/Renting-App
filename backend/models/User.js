// User.js
const { db } = require("./authen");

const createUser = async ({ uid, name, email, phone }) => {
  const user = {
    uid,
    name,
    email,
    phone,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.collection("users").doc(uid).set(user);
  return user;
};

const getUser = async (uid) => {
  const doc = await db.collection("users").doc(uid).get();
  return doc.exists ? doc.data() : null;
};

module.exports = { createUser, getUser };
