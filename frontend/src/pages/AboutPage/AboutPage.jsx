import React from 'react';
import { motion } from 'framer-motion';
import './AboutPage.css';
import { Link,useNavigate } from 'react-router-dom';
import SudarshanImg from '../../assets/team/sudarshan.jpg';


const AboutPage = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      id: 1,
      name: 'Sudarshan Tudu',
      role: 'CEO & Founder',
      image: SudarshanImg,
      description: 'Real estate expert with 15+ years experience'
    },
    {
      id: 2,
      name: 'Reshu Singh',
      role: 'CTO',
      image: '',
      description: 'Tech innovator passionate about property solutions'
    },
    {
      id: 3,
      name: 'Shashwat Pathak',
      role: 'Head of Operations',
      image: '',
      description: 'Ensuring smooth rental experiences'
    },
        {
      id: 4,
      name: 'Kishan Paul',
      role: 'HR & Administration Head',
      image: '',
      description: 'Overseeing HR policies, compliance, and internal operations'

    }
  ];

  const stats = [
    { number: '10,000+', label: 'Properties Listed' },
    { number: '50,000+', label: 'Happy Customers' },
    { number: '100+', label: 'Cities Covered' },
    { number: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="about-title">About RentEase</h1>
          <p className="about-subtitle">
            Revolutionizing the rental experience since 2015
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <motion.div 
            className="story-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Story</h2>
            <p>
              RentEase was founded with a simple mission: to make finding and 
              renting properties as easy as possible. What started as a small 
              startup in 2015 has grown into the nation's leading rental platform.
            </p>
            <p>
              We saw the frustration in the traditional rental process and 
              decided to create a solution that benefits both renters and 
              property owners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="team-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div 
                  className="team-image"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <motion.div 
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Our Mission</h2>
          <p className="mission-text">
            To create a seamless, transparent, and enjoyable rental experience 
            for everyone. We believe that finding your perfect space should be 
            exciting, not stressful.
          </p>
          <div className="values-grid">
            {[
              { icon: '🤝', title: 'Trust', desc: 'Verified listings and secure processes' },
              { icon: '💡', title: 'Innovation', desc: 'Constantly improving our platform' },
              { icon: '❤️', title: 'Care', desc: 'Putting customers first always' },
              { icon: '🌍', title: 'Impact', desc: 'Making renting better for everyone' }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <motion.div 
          className="container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Join the RentEase Community</h2>
          <p>Be part of the future of renting</p>
          <motion.button
  className="btn btn-primary"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
    navigate("/"); // change to your new page route
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
>
  Get Started Today
</motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;