import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Import getAuth

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBi2n9L1gW9yObbpKRIKM3HJrQpKI8WLY",
  authDomain: "renting-app-6ab20.firebaseapp.com",
  projectId: "renting-app-6ab20",
  storageBucket: "renting-app-6ab20.firebasestorage.app",
  messagingSenderId: "392712192588",
  appId: "1:392712192588:web:36aa25cdce6c0332a8aae9",
  measurementId: "G-EVME9XEX0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
const auth = getAuth(app);
// ✅ Export auth
export { auth };