import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// Register
export const registerUser = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    await updateProfile(userCredential.user, { displayName: formData.name });

    return {
      message: "Signup successful",
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      },
    };
  } catch (error) {
    return { message: error.message };
  }
};

// Login
export const loginUser = async (formData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    return {
      message: "Login successful",
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      },
    };
  } catch (error) {
    return { message: error.message };
  }
};
