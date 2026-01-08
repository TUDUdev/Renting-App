import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

// Register
export const registerUser = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    await updateProfile(userCredential.user, { displayName: formData.name });

    await signOut(auth);

    return {
      message: "Account created successfully. Please login.",
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

//Reset Password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);

    return {
      success: true,
      message: "Password reset email sent. Check your inbox.",
    };
  } catch (error) {
    let message = "Something went wrong";

    switch (error.code) {
      case "auth/user-not-found":
        message = "No account found with this email";
        break;
      case "auth/invalid-email":
        message = "Invalid email address";
        break;
      default:
        message = error.message;
    }

    return { success: false, message };
  }
};
