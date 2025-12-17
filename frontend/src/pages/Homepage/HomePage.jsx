import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewAll=()=>{
    const isLoggedIn = localStorage.getItem("user");
    if(isLoggedIn){
      navigate("/properties");
    }else{
      navigate("/login")
    }
  }
  const properties = [
    {
      id: 1,
      title: 'BS Complex',
      price: ' ₹1,200/month',
      location: 'New York, NY',
      bedrooms: 2,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Dalma view Studio Apartment',
      price: ' ₹2000/night',
      location: 'Baridih, Jamshedpur',
      bedrooms: 1,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w-800&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Luxury Villa',
      price: '₹,500/month',
      location: 'Miami, FL',
      bedrooms: 4,
      bathrooms: 3,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop'
    }
  ];

  const features = [
    {
      icon: '🏠',
      title: 'Wide Selection',
      description: 'Thousands of properties across the country'
    },
    {
      icon: '🔐',
      title: 'Secure Process',
      description: 'Verified listings and secure transactions'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden fees'
    },
    {
      icon: '⭐',
      title: 'Top Rated',
      description: 'Highly rated by thousands of renters'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Find Your <span className="highlight">Perfect</span> Rental
            </h1>
            <p className="hero-subtitle">
              Discover thousands of verified rental properties across the country. 
              Your dream space is just a click away.
            </p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link to="/properties" className="btn btn-primary pulse" style={{marginTop: "20px"}}>
                Start Exploring
              </Link>
              <Link to="/about" className="btn btn-secondary" style={{marginTop: "20px"}}>
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose RentEase?
          </motion.h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="properties-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Properties
          </motion.h2>
          <div className="properties-grid">
            {properties.map((property, index) => (
              <motion.div 
                key={property.id}
                className="property-card card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="property-image" style={{ backgroundImage: `url(${property.image})` }} />
                <div className="property-content">
                  <h3>{property.title}</h3>
                  <div className="property-details">
                    <span>📍 {property.location}</span>
                    <span>🛏️ {property.bedrooms} Bed</span>
                    <span>🛁 {property.bathrooms} Bath</span>
                  </div>
                  <div className="property-price">{property.price}</div>
                  <button className="btn btn-primary">View Details</button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={handleViewAll} className="btn btn-primary">
              View All Properties
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div 
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Find Your New Home?</h2>
          <p>Join thousands of satisfied renters today.</p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/properties" className="btn btn-primary">
              Get Started Free
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;