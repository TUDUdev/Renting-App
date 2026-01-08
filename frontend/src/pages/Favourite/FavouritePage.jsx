import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../../../utils/wishlist'; 
import './FavouritePage.css'

const FavoritesPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setWishlist(getWishlist());
  };

  if (wishlist.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div className="favorites-page">
      <h2>My Wishlist</h2>
      <div className="favorites-grid">
        {wishlist.map(item => (
          <div key={item.id} className="favorite-card">
            <div className="favorite-image" style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className="favorite-content">
              <h3>{item.title}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Type: {item.type}</p>
              <div className="actions">
                <Link to={`/property/${item.id}`} className="btn btn-primary">View</Link>
                <button className="btn btn-secondary" onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
