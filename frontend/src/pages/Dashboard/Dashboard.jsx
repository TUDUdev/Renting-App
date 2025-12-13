import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [recentViews, setRecentViews] = useState([]);

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
        <h2>Welcome back, {user?.name} 👋</h2>
        <p>Your dashboard gives you quick access to everything you need.</p>

        <div className="dashboard-links">
          <Link to="/properties">🏠 View All Properties</Link>
          <Link to="/favorites">❤️ My Wishlist</Link>
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
              <li key={index}>
                <span>🏡 {item.title}</span>
                <Link to={`/property/${item.id}`}>View</Link>
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

    </div>
  );
};

export default Dashboard;
