import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getWishlist } from "../../../utils/wishlist"; 
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [recentViews, setRecentViews] = useState([]);
  const removeRecentItem = (id) => {
  const updated = recentViews.filter(item => item.id !== id);
  setRecentViews(updated);
  localStorage.setItem("recentViews", JSON.stringify(updated));
};

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("recentViews")) || [];
    setRecentViews(history.slice(0, 3));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Card */}
      <div className="dashboard-card">
        <h2>Welcome back, {user.displayName} 👋</h2>
        <p>Your dashboard gives you quick access to everything you need.</p>

        <div className="dashboard-links">
          <Link to="/properties">🏠 View All Properties</Link>
          <Link to="/favorites">❤️ My Wishlist ({getWishlist().length})</Link>
          <Link to="/profile">👤 My Profile</Link>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Recent Viewed Properties */}
      <div className="dashboard-card">
  <h3>Recently Viewed</h3>

  {recentViews.length === 0 ? (
    <p>No recent activity yet.</p>
  ) : (
    <ul className="recent-list">
      {recentViews.map((item, index) => (
        <li key={index} className="recent-item">

          <span>🏡 {item.title}</span>

          <div className="recent-actions">
            <Link to={`/property/${item.id}`}>View</Link>

            <button
              className="remove-btn"
              onClick={() => removeRecentItem(item.id)}
              title="Remove from history"
            >
              ❌
            </button>
          </div>

        </li>
      ))}
    </ul>
  )}
</div>


      {/* Messages */}
      <div className="dashboard-card">
        <h3>Messages</h3>
        <p>You have no messages yet.</p>
      </div>

      {/* Recommendations */}
      <div className="dashboard-card">
        <h3>Recommended for You</h3>
        <div className="recommend-grid">
          <Link to="/properties?type=apartment">🏢 Apartments</Link>
          <Link to="/properties?type=house">🏠 Houses</Link>
          <Link to="/properties?type=villa">🏡 Villas</Link>
        </div>
      </div>
             {/* Rent Your House */}
<div className="dashboard-card">
  <h3>Rent Your House</h3>
  <p>List your property and reach potential tenants quickly.</p>
  <Link to="/dashboard/rent" className="rent-btn">
    🏠 Rent Your House
  </Link>
</div>


    </div>
  );
};

export default Dashboard;
