import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [username, setUsername] = useState("");

  const loadUsername = (user) => {
    if (!user) {
      setUsername("");
      return;
    }

    // Firebase first
    if (user.displayName) {
      setUsername(user.displayName);
      return;
    }

    // localStorage fallback
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUsername(storedUser?.displayName || "User");
  };

  useEffect(() => {
    // 🔐 Login / Logout
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      loadUsername(user);
    });

    // 🔔 Profile update listener
    const profileListener = () => {
      loadUsername(auth.currentUser);
    };

    window.addEventListener("profileUpdated", profileListener);

    return () => {
      unsub();
      window.removeEventListener("profileUpdated", profileListener);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <motion.nav className="navbar" initial={{ y: -100 }} animate={{ y: 0 }}>
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <span className="logo-text">RentEase</span>
            <span className="logo-tagline">Find Your Perfect Space</span>
          </Link>

          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>

            {isLoggedIn ? (
              <>
                {/* ✅ ALWAYS UPDATES */}
                <span className="nav-username">👤 {username}</span>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
