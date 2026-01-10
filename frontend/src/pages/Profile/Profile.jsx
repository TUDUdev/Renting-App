import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const firebaseUser = auth.currentUser;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // ✅ NEVER EMPTY STATES
  const [displayName, setDisplayName] = useState(
    firebaseUser?.displayName || storedUser?.displayName || ""
  );
  const [email] = useState(
    firebaseUser?.email || storedUser?.email || ""
  );
  const [phone, setPhone] = useState(storedUser?.phone || "");
  const [profilePic, setProfilePic] = useState(
    firebaseUser?.photoURL || storedUser?.profilePic || ""
  );
  const [message, setMessage] = useState("");

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!firebaseUser) {
      navigate("/login");
      return;
    }

    // 🔄 Sync latest Firebase data to localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        profilePic: firebaseUser.photoURL,
        phone: storedUser?.phone || "",
      })
    );
  }, []);

  // ✅ UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      if (!firebaseUser) return;

      // Update Firebase Auth
      await updateProfile(firebaseUser, {
        displayName,
        photoURL: profilePic || null,
      });

      // Update localStorage
      const updatedUser = {
        email,
        displayName,
        phone,
        profilePic,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // 🔔 Notify Navbar
      window.dispatchEvent(new Event("profileUpdated"));

      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Failed to update profile");
    }
  };

  // 📸 Handle image upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {message && <p className="profile-message">{message}</p>}

      <div className="profile-card">
        <div className="profile-pic-section">
          <img
            src={profilePic || "/default-avatar.png"}
            alt="Profile"
            className="profile-pic"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="profile-pic-input"
          />
        </div>

        <div className="profile-info">
          <label>
            Name:
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>

          <label>
            Email:
            <input type="email" value={email} disabled />
          </label>

          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <button className="update-btn" onClick={handleUpdate}>
            💾 Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
