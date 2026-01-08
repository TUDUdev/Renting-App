import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../../../utils/wishlist';
import './PropertiesPage.css';

const PropertiesPage = () => {
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  // Store property in Recently Viewed
const addToRecentViews = (property) => {
  const propertyToStore = {
    id: property._id,
    title: property.title,
    image: property.images?.[0] || "",
    type: property.type
  };
  const history = JSON.parse(localStorage.getItem("recentViews")) || [];
  const filtered = history.filter(item => item.id !== propertyToStore.id);
  filtered.unshift(propertyToStore);
  localStorage.setItem("recentViews", JSON.stringify(filtered.slice(0, 10)));
};
//Wishlist
const toggleWishlist = (property) => {
  if (isInWishlist(property._id)) {
    removeFromWishlist(property._id);
    setFavorites(prev => prev.filter(fav => fav !== property._id));
  } else {
    addToWishlist(property);
    setFavorites(prev => [...prev, property._id]);
  }};
  //Data came from here
  useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/properties");
      const data = await res.json();
      setAllProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    } };
  fetchProperties();
}, []);
  // State for filters
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    available: 'all'
  });
  // State for sorting
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  // Filter and sort properties
  const filteredProperties = allProperties.filter(property => {
    // Location filter
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
  
    // Type filter
    if (filters.type && property.type !== filters.type) {
      return false;
    }
    // Price range filter
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
      return false;
    }
    // Bedrooms filter
    if (filters.bedrooms && property.bedrooms !== parseInt(filters.bedrooms)) {
      return false;
    }
    // Availability filter
    if (filters.available === 'available' && !property.available) {
      return false;
    }
    if (filters.available === 'unavailable' && property.available) {
      return false;
    }
    
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return (b.rating || 0) - (a.rating || 0);
      case 'bedrooms-desc':
        return b.bedrooms - a.bedrooms;
      case 'sqft-desc':
        return b.sqft - a.sqft;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = sortedProperties.slice(indexOfFirstItem, indexOfLastItem);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle favorite
    const toggleFavorite = (id) => {
  setFavorites((prev) =>
    prev.includes(id)
      ? prev.filter((fav) => fav !== id)
      : [...prev, id]
  );
};


  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      available: 'all'
    });
    setCurrentPage(1);
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
    }
    
    return stars;
  };

  // Property type options
  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'studio', label: 'Studio' },
    { value: 'loft', label: 'Loft' },
    { value: 'villa', label: 'Villa' },
    { value: 'penthouse', label: 'Penthouse' }
  ];

  // Bedrooms options
  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4+ Bedrooms' }
  ];

    if (loading) {
    return <div className="loading">Loading properties...</div>;
  }

  if (allProperties.length === 0) {
    return <div className="no-properties">No properties found.</div>;
  }
  return (
    <div className="properties-page">
      {/* Hero Section */}
      <section className="properties-hero">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">Find Your Perfect Property</h1>
          <p className="hero-subtitle">
            Browse through our extensive collection of rental properties
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="container properties-container">
        <div className="properties-layout">
          {/* Filters Sidebar */}
          <motion.aside 
            className={`filters-sidebar ${showFilters ? 'show' : ''}`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="filters-header">
              <h2>Filters</h2>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={resetFilters}
              >
                Reset All
              </button>
            </div>

            <div className="filter-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="City or State"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="type">Property Type</label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
              >
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range (₹)</label>
              <div className="price-range">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Min"
                  min="0"
                />
                <span className="range-separator">to</span>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
              >
                {bedroomOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Availability</label>
              <div className="availability-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="available"
                    value="all"
                    checked={filters.available === 'all'}
                    onChange={handleFilterChange}
                  />
                  <span>All</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="available"
                    value="available"
                    checked={filters.available === 'available'}
                    onChange={handleFilterChange}
                  />
                  <span>Available</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="available"
                    value="unavailable"
                    checked={filters.available === 'unavailable'}
                    onChange={handleFilterChange}
                  />
                  <span>Unavailable</span>
                </label>
              </div>
            </div>

            <div className="filter-stats">
              <p>Showing {sortedProperties.length} of {allProperties.length} properties</p>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="properties-main">
            {/* Header with sort and toggle */}
            <div className="properties-header">
              <motion.button
                className="btn btn-secondary filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </motion.button>

              <div className="sort-controls">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="sort-select"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="bedrooms-desc">Most Bedrooms</option>
                  <option value="sqft-desc">Largest</option>
                </select>
              </div>
            </div>

            {/* Properties Grid */}
            <AnimatePresence mode="wait">
              {currentProperties.length > 0 ? (
                <motion.div 
                  className="properties-grid"
                  key="properties-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentProperties.map((property, index) => (
                    <motion.div
                      key={property._id}
                      className="property-card card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -10, transition: { duration: 0.2 } }}
                    >
                      {/* Favorite Button */}
                      <button
  className="favorite-btn"
  onClick={() => toggleWishlist(property)}
>
  {isInWishlist(property._id) ? '❤️' : '🤍'}
</button>


                      {/* Status Badge */}
                      {!property.available && (
                        <div className="status-badge unavailable">
                          Unavailable
                        </div>
                      )}

                      {/* Property Image */}
                      <div 
                        className="property-image"
                        style={{  backgroundImage: `url(${property.images && property.images.length > 0 ? property.images[0] : '/placeholder.png'})` }}
                      >
                        <div className="price-tag">
                          ₹{property.price}<span>/month</span>
                        </div>
                      </div>

                      {/* Property Content */}
                      <div className="property-content">
                        <h3 className="property-title">{property.title}</h3>
                        
                        <div className="property-location">
                          <span className="location-icon">📍</span>
                          {property.location}
                        </div>

                        <div className="property-features">
                          <span className="feature">
                            <span className="feature-icon">🛏️</span>
                            {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                          </span>
                          <span className="feature">
                            <span className="feature-icon">🛁</span>
                            {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                          </span>
                          <span className="feature">
                            <span className="feature-icon">📏</span>
                            {property.sqft} sqft
                          </span>
                        </div>

                        <div className="property-description">
                          <p>{property.description}</p>
                        </div>

                        <div className="property-rating">
                          <div className="stars">
                            {renderStars(property.rating)}
                            <span className="rating-number">{property.rating}</span>
                            <span className="reviews">({property.reviews} reviews)</span>
                          </div>
                        </div>

                        <div className="property-amenities">
                          <div className="amenities-title">Amenities:</div>
                          <div className="amenities-list">
                            {property.amenities.slice(0, 3).map((amenity, idx) => (
                              <span key={idx} className="amenity-tag">{amenity}</span>
                            ))}
                            {property.amenities.length > 3 && (
                              <span className="amenity-tag">+{property.amenities.length - 3} more</span>
                            )}
                          </div>
                        </div>

                        <div className="property-actions">
                          {/* <motion.button 
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!property.available}
                            onClick={()=>{addToRecentViews(property); // ✅ Add property to localStorage
                              navigate(`/schedule/${property._id}`,{state: property,})}}
                          >
                            {property.available ? 'Schedule Viewing' : 'Not Available'}
                          </motion.button> */}
                          <button 
                            className="btn btn-secondary" onClick={() => { addToRecentViews(property);  // ✅ Add property to localStorage
                            navigate(`/property/${property._id}`)}}>
                                View Details
                              </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="no-results-icon">🏠</div>
                  <h3>No properties found</h3>
                  <p>Try adjusting your filters to see more results</p>
                  <button 
                    className="btn btn-primary"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="pagination"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Call to Action */}
      <section className="properties-cta">
        <motion.div 
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Can't find what you're looking for?</h2>
          <p>Sign up for alerts and be the first to know about new properties</p>
          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Set Up Alerts
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default PropertiesPage;