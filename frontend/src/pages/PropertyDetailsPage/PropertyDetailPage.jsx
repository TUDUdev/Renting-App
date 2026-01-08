import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./PropertyDetailPage.css";
import axios from "axios";
import { applyForRent } from "../../../services/rentApi";
import { addToWishlist, removeFromWishlist, isInWishlist } from "../../../utils/wishlist";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [rentForm, setRentForm] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    message: "",
  });
  const [showRentForm, setShowRentForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleFavoriteClick = () => {
  if (isInWishlist(property._id)) {
    removeFromWishlist(property._id);
  } else {
    addToWishlist(property);
  }
  // force re-render
  setProperty({ ...property });
};

  // property data come from an API
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return; // prevents  undefined
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );

        setProperty(data);
        setSelectedImages(data.images || []);
        setActiveImage(0);
      } catch (error) {
        console.error(error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleRentFormChange = (e) => {
    const { name, value } = e.target;
    setRentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    try {
      await applyForRent({
        propertyId: id,
        ...rentForm,
      });

      setSubmitSuccess(true);
      setShowRentForm(false);

      setRentForm({
        name: "",
        email: "",
        phone: "",
        moveInDate: "",
        message: "",
      });
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      alert(error.message || "Failed to submit application");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // const handleScheduleViewing = () => {
  //   navigate("/contact", {
  //     state: { propertyId: id, propertyTitle: property?.title },
  //   });
  // };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="not-found-container">
        <h2>Property Not Found</h2>
        <p>The property you're looking for doesn't exist.</p>
        <Link to="/properties" className="btn btn-primary">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="property-detail-page">
      {/* Hero Section with Images */}
      <section className="property-hero">
        <div className="container">
          <motion.div
            className="breadcrumb"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/properties">Properties</Link> &gt; {property.title}
          </motion.div>

          <motion.div
            className="property-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="property-title">{property.title}</h1>
            <div className="property-location">
              <span className="location-icon">📍</span>
              {property.location} • {property.address}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <div className="property-detail-layout">
          {/* Left Column - Images & Details */}
          <main className="property-main-content">
            {/* Image Gallery */}
            <motion.div
              className="image-gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="main-image-container">
                <div
                  className="main-image"
                  style={{
                    backgroundImage: `url(${selectedImages[activeImage]})`,
                  }}
                />
                {!property.available && (
                  <div className="property-status unavailable">
                    Currently Unavailable
                  </div>
                )}
              </div>

              {selectedImages.length > 1 && (
                <div className="thumbnail-gallery">
                  {selectedImages.map((img, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${
                        index === activeImage ? "active" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <div
                        className="thumbnail-image"
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Property Details */}
            <motion.section
              className="property-details-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2>Property Details</h2>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Property Type:</span>
                  <span className="detail-value">
                    {property.type
                      ? property.type.charAt(0).toUpperCase() +
                        property.type.slice(1)
                      : "N/A"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bedrooms:</span>
                  <span className="detail-value">{property.bedrooms}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bathrooms:</span>
                  <span className="detail-value">{property.bathrooms}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Square Feet:</span>
                  <span className="detail-value">{property.sqft} sqft</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Year Built:</span>
                  <span className="detail-value">{property.yearBuilt}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lease Term:</span>
                  <span className="detail-value">{property.leaseTerm}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deposit:</span>
                  <span className="detail-value">₹{property.deposit}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Availability:</span>
                  <span className="detail-value">
                    {property.availabilityDate}
                  </span>
                </div>
              </div>
            </motion.section>

            {/* Description */}
            <motion.section
              className="description-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2>Description</h2>
              <p className="main-description">
                {property.detailedDescription || property.description}
              </p>

              <div className="description-grid">
                <div className="description-column">
                  <h3>Features</h3>
                  <ul className="features-list">
                    {property.features?.map((feature, index) => (
                      <li key={index}>
                        <span className="check-icon">✓</span>
                        {feature}
                      </li>
                    )) || (
                      <>
                        <li>
                          <span className="check-icon">✓</span> Central Air
                          Conditioning
                        </li>
                        <li>
                          <span className="check-icon">✓</span> Hardwood Floors
                        </li>
                        <li>
                          <span className="check-icon">✓</span> Modern Kitchen
                        </li>
                        <li>
                          <span className="check-icon">✓</span> Ample Storage
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="description-column">
                  <h3>Amenities</h3>
                  <ul className="amenities-list">
                    {property.amenities?.map((amenity, index) => (
                      <li key={index}>
                        <span className="amenity-icon">🏊</span>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Utilities */}
            <motion.section
              className="utilities-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2>Utilities</h2>
              <div className="utilities-grid">
                <div className="utilities-included">
                  <h4>Included in Rent:</h4>
                  <ul>
                    {property.utilitiesIncluded?.map((util, index) => (
                      <li key={index}>✓ {util}</li>
                    ))}
                  </ul>
                </div>
                <div className="utilities-not-included">
                  <h4>Not Included:</h4>
                  <ul>
                    {property.utilitiesNotIncluded?.map((util, index) => (
                      <li key={index}>✗ {util}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>
          </main>

          {/* Right Column - Rent Section & Contact */}
          <aside className="property-sidebar">
            <motion.div
              className="rent-card sticky-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="rent-price">
                <span className="price">₹{property.price}</span>
                <span className="period">/month</span>
              </div>

              <div className="rent-status">
                <div
                  className={`status-badge ${
                    property.available ? "available" : "unavailable"
                  }`}
                >
                  {property.available
                    ? "Available Now"
                    : "Currently Unavailable"}
                </div>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-number">{property.rating}</span>
                  <span className="reviews">({property.reviews} reviews)</span>
                </div>
              </div>

              {submitSuccess && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  ✅ Application submitted successfully! We'll contact you soon.
                </motion.div>
              )}

              {showRentForm ? (
                <motion.form
                  className="rent-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  onSubmit={handleRentSubmit}
                >
                  <h3>Apply to Rent</h3>

                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={rentForm.name}
                      onChange={handleRentFormChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={rentForm.email}
                      onChange={handleRentFormChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={rentForm.phone}
                      onChange={handleRentFormChange}
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="moveInDate">Desired Move-In Date *</label>
                    <input
                      type="date"
                      id="moveInDate"
                      name="moveInDate"
                      value={rentForm.moveInDate}
                      onChange={handleRentFormChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Additional Information</label>
                    <textarea
                      id="message"
                      name="message"
                      value={rentForm.message}
                      onChange={handleRentFormChange}
                      placeholder="Tell us about yourself and why you're interested in this property..."
                      rows="4"
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowRentForm(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <div className="rent-actions">
                  <motion.button
                    className="btn btn-primary rent-btn"
                    onClick={() => setShowRentForm(true)}
                    disabled={!property.available}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {property.available ? "Apply to Rent" : "Not Available"}
                  </motion.button>

                  {/* <motion.button
                    className="btn btn-secondary"
                    onClick={handleScheduleViewing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule Viewing
                  </motion.button> */}

                  <button className="btn btn-outline favorite-btn" onClick={handleFavoriteClick}>
  {isInWishlist(property._id) ? '❤️ Saved' : '♡ Save Property'}
</button>

                </div>
              )}

              <div className="landlord-info">
                <h3>Contact Landlord</h3>
                <div className="landlord-details">
                  <div className="landlord-name">
                    <strong>{property.landlord?.name}</strong>
                  </div>
                  <div className="landlord-company">
                    {property.landlord?.company}
                  </div>
                  <div className="landlord-contact">
                    <div>📞 {property.landlord?.phone}</div>
                    <div>✉️ {property.landlord?.email}</div>
                  </div>
                </div>
              </div>

              <div className="property-summary">
                <h3>Quick Facts</h3>
                <ul>
                  <li>📍 {property.location}</li>
                  <li>🛏️ {property.bedrooms} Bedrooms</li>
                  <li>🛁 {property.bathrooms} Bathrooms</li>
                  <li>📏 {property.sqft} Square Feet</li>
                  <li>💰 ₹{property.deposit} Security Deposit</li>
                  <li>📅 {property.leaseTerm} Lease</li>
                </ul>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>

      {/* Back to Properties Button */}
      <motion.div
        className="back-button-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="container">
          <Link to="/properties" className="btn btn-secondary">
            ← Back to Properties
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetailPage;
