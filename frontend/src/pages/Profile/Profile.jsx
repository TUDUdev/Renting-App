import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  // Form state
  const [displayName, setDisplayName] = useState(storedUser.displayName || "");
  const [email, setEmail] = useState(storedUser.email || "");
  const [phone, setPhone] = useState(storedUser.phone || "");
  const [profilePic, setProfilePic] = useState(storedUser.profilePic || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!storedUser.email) {
      navigate("/login"); // redirect if no user is logged in
    }
  }, [storedUser, navigate]);

  // Handle profile update
  const handleUpdate = () => {
    const updatedUser = { ...storedUser, displayName, email, phone, profilePic };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage("✅ Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result); // store as base64
      reader.readAsDataURL(file);
    }
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
